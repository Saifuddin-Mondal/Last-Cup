import React, { useState, useEffect } from 'react'
import Navbar from '../Core/Navbar'
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {addOrder, removeOrder, loadOrder } from '../Redux/Cart-system';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import '../Style/Product.css'
import { Link } from 'react-router-dom'
import veg from '../../assets/1531813273.png'
import nonveg from '../../assets/1531813245.png'
import { fetchParticularProduct} from '../Services/Operations/ProductAPI'
import { useLocation } from 'react-router-dom';
import { cart_data,cart_update,getCart_data,cart_delete } from "../Services/Operations/ProductAPI";

const Product = () => {
    const location = useLocation();
    const navigate=useNavigate();
    // console.log("fsdgkjfljdkohksdkljklsddjfodsjgio",location)
    const searchParams = new URLSearchParams(location.search);
    // console.log("Actual",searchParams)
    const categoryId = searchParams.get('Id');
    const {orderState,totalItem} = useSelector((state) => state.cart);
    const {loginData} =useSelector((state)=>state.user);

    const [response2, setResponse2] = useState([])
    const [itemType, setItemType] = useState('');
    const [popular_qty, setPopular_qty] = useState([])
    const { userId } = useSelector((state) => state.user);

    useEffect(() => {
        const loadProduct1 = async () => {
            console.log(categoryId);
            if (categoryId) {
                try {
                    const data = await fetchParticularProduct({ categoryId });
                    console.log("Saifuddin................", data.product_details);
                    if (data && data.product_details) {
                        setResponse2(data.product_details);
                        console.log(".........................")
                        // console.log(response1)
                    }
                    else {
                        console.error('No products found for the given category ID');
                    }
                }
                catch (err) {
                    console.log('Error fetching product data');
                }
            }
        }
        loadProduct1();
    },[])

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const user_id = userId.user_id;
                const response = await getCart_data(user_id);
                console.log("Cart Data in popular section", response.data.data);
                setPopular_qty(response.data.data);
            }
            catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCartData();
    }, []);

    const fetchCartData1 = async () => {
        try {
            const user_id = userId.user_id;
            const response = await getCart_data(user_id);
            console.log("Cart Data in popular section", response.data.data);
            setPopular_qty(response.data.data);
        }
        catch (error) {
            console.error("Error fetching cart:", error);
        }
    };


    const { cart } = useSelector((item) => item.cart);
    console.log(cart);
    const dispatch = useDispatch();

    const getItemQuantity = (item) => {
        console.log("item", item);
        const qty_value = popular_qty;
        const cartItem = qty_value.find(cart => String(cart.prod_id) === String(item.id));
        console.log("matched:", cartItem);
        if (cartItem) {
            console.log("match prod_id");
            return cartItem.qty;
        } else {
            return 0;
        }
    };

    // const getItemQuantity = (itemId) => {
    //     const item = cart.find((item) => item.id === itemId);

    // };
    // const getItemQuantity = (itemId) => {
    //     const item = cart.find((item) => item.id === itemId);
    //     return item ? item.quantity : 0;
    // };
    // const handleOrder = async(id, item) => {
    //     if (!orderState.some(cartItem => cartItem.id === item.id)) {
    //        try{
    //         const itemWithQuantity = { ...item, qty: 1 };
    //         const response = await cart_data(itemWithQuantity);
    //         console.log("........response",response)
    //         console.log("........itemWithQuantity",itemWithQuantity)

    //         if(response.data.status === "success"){
    //             console.log("id add",id)
    //             dispatch(addOrder({ id }));
    //         }
    //        }
    //        catch(error){
    //         console.log("error")
    //        }
    //     }

    // }
    const handleOrder = async (id, item) => {
        if(!loginData){
            navigate("/login");
        }
        if (!orderState.some(cartItem => cartItem.id === item.id)) {
            try {
                const user_id = userId.user_id;
                const itemWithQuantity = { ...item, qty: 1, user_id };
                const response = await cart_data(itemWithQuantity);
                console.log("........response", response)
                console.log("........itemWithQuantity", itemWithQuantity)

                if (response.data.status === "success") {
                    console.log("id add", id)
                    dispatch(addOrder({ id }));
                    fetchCartData1();
                }
            }
            catch (error) {
                console.log("error")
            }
        }

    }
    const handleCountNegative = async (item) => {
        const user_id = userId.user_id;

        try {
            const response = await getCart_data(user_id);
            console.log("count positive1 : ", response);

            const cartItems = response.data.data;

            const cartItem = cartItems.find(cart => String(cart.prod_id) === String(item.id));
            console.log("matched1:", cartItem);

            if (cartItem) {
                let quant = cartItem.qty - 1;
                if (quant <= 0) {
                    // console.log("quantity : ",quant);
                    // console.log(item);
                    // const id = item.id;
                    // console.log("id : ",id);
                    // // const updateResponse = await cart_update(user_id, item.id, quant, item.prod_price);
                    // const updateResponse=await cart_delete(id);
                    // console.log("Count positive response : ", updateResponse);
                    // if (updateResponse.data.status === "success") {
                    //     // const response = await getCart_data(user_id);
                    //     dispatch(removeOrder({ id }));
                    //     fetchCartData1();
                    // }
                    const response = await cart_delete(cartItem.id);
                    const id = cartItem.prod_id;
                    dispatch(removeOrder({ id }));
                }
                else {
                    console.log(quant);

                    const updateResponse = await cart_update(user_id, item.id, quant, item.prod_price);
                    console.log("Count positive response : ", updateResponse);
                    if (updateResponse.data.status === "success") {
                        // const response = await getCart_data(user_id);
                        fetchCartData1();
                    }
                }
            } else {
                console.log("Item not found in cart.");
            }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const handleCountPositive = async (item) => {
        const user_id = userId.user_id;

        try {
            const response = await getCart_data(user_id);
            console.log("count positive1 : ", response);

            const cartItems = response.data.data;

            const cartItem = cartItems.find(cart => String(cart.prod_id) === String(item.id));
            console.log("matched1:", cartItem);

            if (cartItem) {
                let quant = cartItem.qty + 1;
                console.log(quant);

                const updateResponse = await cart_update(user_id, item.id, quant, item.prod_price);
                console.log("Count positive response : ", updateResponse);
                if (updateResponse.data.status === "success") {
                    // const response = await getCart_data(user_id);
                    fetchCartData1();
                }
            } else {
                console.log("Item not found in cart.");
            }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    useEffect(() => {
        const savedOrder = Cookies.get('orderState');
        if (savedOrder) {
            dispatch(loadOrder(JSON.parse(savedOrder)));
        }
    }, [dispatch]);


    const handleFetchNonVeg=()=>{
        setItemType('Non-Veg');
    }
    const handleFetchVeg=()=>{
        setItemType('Veg');
    }

    const filteredItems = itemType === ''
    ? response2
    : response2.filter(item => item.prod_type === itemType);

    return (
        <div className='Product-wrapper'>
            <Navbar />
            <div className='product-section'>
                <div className='Product-container'>
                    <div className='menu-bar'>
                        <Link className='menu-bar-link' to="/"><p className='menu-angle-right'>Home <FaAngleRight /></p></Link>
                        <p className='menu-text'>Menu</p>
                    </div>
                    <div className='veg-nonveg-btn'>
                        <img onClick={handleFetchNonVeg} src={nonveg} width='60' height='60' style={{ cursor: itemType === 'Veg' ? 'pointer': 'not-allowed',opacity: (itemType === 'Veg' || itemType === '') ? 1 : 0.6,transition: 'opacity 0.3s' }} alt='...' />
                        <img onClick={handleFetchVeg} src={veg} width='60' height='60' style={{ cursor: itemType === 'Non-Veg' ?'pointer' :'not-allowed',opacity: itemType === 'Non-Veg' || itemType === '' ? 1 : 0.6,transition: 'opacity 0.3s' }} alt='...' />
                    </div>

                    <div className='section2-all-container Product-all-container'>
                        {
                            filteredItems.map((item, index) => (
                                <div key={index} className='section2-one-container product-one-container'>
                                    <img src={item.banner_image} alt='...' width="220px" height="220px"/>
                                    <h5>{item.prod_name}</h5>
                                    {/* <p><FaMapMarkerAlt /> {item.text2}</p> */}
                                    <span className='section2-span-rs'>₹{item.prod_price}</span>
                                    {!orderState.find(cartItem => cartItem.id === item.id) ? <button className='section2-one-btn' onClick={() => handleOrder(item.id, item)}>Order Now</button> : <div className='section-btn'>
                                            <button className='section-add-sub' onClick={() => handleCountNegative(item)}>-</button>
                                            <span>{getItemQuantity(item)}</span>
                                        <span>{item.qty}</span>
                                            <button className='section-add-sub' onClick={() => handleCountPositive(item)}>+</button>
                                        </div>
                                        }
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
