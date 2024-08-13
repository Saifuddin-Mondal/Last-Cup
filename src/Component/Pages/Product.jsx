import React, { useState, useEffect } from 'react'
import Navbar from '../Core/Navbar'
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {addOrder, removeOrder, loadOrder } from '../Redux/Cart-system';
import Cookies from "js-cookie"
import '../Style/Product.css'
import { Link } from 'react-router-dom'
import veg from '../../assets/1531813273.png'
import nonveg from '../../assets/1531813245.png'
import { fetchParticularProduct} from '../Services/Operations/ProductAPI'
import { useLocation } from 'react-router-dom';
import { cart_data,cart_update } from "../Services/Operations/ProductAPI";

const Product = () => {
    const location = useLocation();
    // console.log("fsdgkjfljdkohksdkljklsddjfodsjgio",location)
    const searchParams = new URLSearchParams(location.search);
    // console.log("Actual",searchParams)
    const categoryId = searchParams.get('Id');
    const {orderState,totalItem} = useSelector((state) => state.cart);

    const [response2, setResponse2] = useState([])
    const [itemType, setItemType] = useState('');

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


    const { cart } = useSelector((item) => item.cart);
    console.log(cart);
    const dispatch = useDispatch();

    // const getItemQuantity = (itemId) => {
    //     const item = cart.find((item) => item.id === itemId);

    // };
    const getItemQuantity = (itemId) => {
        const item = cart.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
    };
    const handleOrder = async(id, item) => {
        if (!orderState.some(cartItem => cartItem.id === item.id)) {
           try{
            const itemWithQuantity = { ...item, qty: 1 };
            const response = await cart_data(itemWithQuantity);
            console.log("........response",response)
            console.log("........itemWithQuantity",itemWithQuantity)

            if(response.data.status === "success"){
                console.log("id add",id)
                dispatch(addOrder({ id }));
            }
           }
           catch(error){
            console.log("error")
           }
        }

    }
    const handleCountNegative = async(item) => {
        // const quant = getItemQuantity(item.id);
        var quant;
        if (quant <= 1) {
            // quant=quant-1;
            dispatch(removeOrder(item.id));
            // dispatch(removeFromCart(item))
            totalItem--;
        }
        else {
            quant=quant-1;
            try{
                const response=await cart_update(item.id,quant,item.banner_image);
            console.log(response);
            // dispatch(Decrement(item))
            }
            catch(error){
                console.error("Error updating cart:", error);
            }
        }
    }

    const handleCountPositive = async(item) => {
        // let quant = getItemQuantity(item.id);
        var quant;
        quant=quant+1;
        try{
            console.log("........GiSalmon........")
            const response=await cart_update(item.id,quant,item.banner_image);
            console.log("........GiSalmon........")
            console.log(response);
        }
        catch(error){

        }
    }
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
                                            {/* <span>{getItemQuantity(item.id)}</span> */}
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
