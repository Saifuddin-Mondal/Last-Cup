import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeOrder,add_total,addCart } from '../Redux/Cart-system'
import { useMemo } from 'react';
import "../Style/Cart.css"
import { Link } from 'react-router-dom';
import { cart_update, getCart_data, cart_delete } from '../Services/Operations/ProductAPI';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const { orderState } = useSelector((state) => state.cart);
    const {userId} =useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const fetchCartData = async () => {
        try {
          console.log("userId : ",userId);
          const user_id=userId.user_id;
          // console.log("user_id : ",user_id);
          const response = await getCart_data(user_id);
          console.log("get cart response : ",response);
          setCartData(response.data.data);
          dispatch(addCart(response.data.data));
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
    
      const handleCountNegative = async (item) => {
        console.log("item of negative : ",item)
        let quant = item.qty;
        console.log(quant)
        if (quant <= 1) {
          const id = item.prod_id;
          dispatch(removeOrder({ id }));
          console.log("saifu..........")
          try {
            const response = await cart_delete(item.id);
            if (response.data.status === 'success') {
              fetchCartData();
            }
          } catch (error) {
            console.error("Error deleting cart item:", error);
          }
        } else {
          quant = quant - 1;
          console.log(quant);
          try {
            const user_id=userId.user_id;
            const response = await cart_update(user_id,item.prod_id, quant, item.prod_price);
            if (response.data.status === 'success') {
              fetchCartData();
            }
          } catch (error) {
            console.error("Error updating cart:", error);
          }
        }
      };
    
      const handleCountPositive = async (item) => {
        let quant = item.qty + 1;
        try {
          const user_id=userId.user_id;
          const response = await cart_update(user_id,item.prod_id, quant, item.prod_price);
          if (response.data.status === 'success') {
            fetchCartData();
          }
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      };
    
      const handleRemove = async (item) => {
        try {
          const response = await cart_delete(item.id);
          const id = item.prod_id;
          dispatch(removeOrder({ id }));
          fetchCartData();
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }
      };

    //   const handleCheckout = () => {
    //     if (loginData) {
    //         navigate("/checkout");
    //     } 
    //     else {
    //         navigate("/login");
    //     }
    // }
    
    
      useEffect(() => {
        console.log("fetch data");
          if (!userId) {
              setCartData([]);  // Clear cart data if user is logged out
          } else {
            console.log("already login: ",userId);
              fetchCartData();  // Fetch cart data if user is logged in
          }
      }, [userId]); 

    const total = useMemo(() => {
        return cartData.reduce((total, item) => total + (item.prod_price * item.qty), 0);
    }, [cartData]);

    useEffect(()=>{
        dispatch(add_total(total))
    },[cartData])

    return (
        <div className='cart-wrapper'>
            <div className='cart-container'>
                <div className='cart-header'>
                    <h3>Your Cart</h3>
                    <div className='cart-slider-list'>
                        {
                            cartData.map((item, id) => (
                                <div className='cart-item' key={id}>
                                    <img src={item.banner_image} alt={`${item.title}`} />
                                    <div className='cart-ruppes-button'>
                                        {/* <p className='cart-ruppes-button1'>{item.}</p> */}
                                        <p className='rupees'>Price : ₹{item.prod_price}</p>
                                        <div className='cart-button-in'>
                                            <button className='section-add-sub' onClick={() => handleCountNegative(item)}>-</button>
                                            <span>{item.qty}</span>
                                            <button className='section-add-sub' onClick={() => handleCountPositive(item)}>+</button>
                                        </div>
                                        <p className='rupees'>Total : ₹{item.total_price}</p>
                                    </div>
                                    <div className='cart-remove-btn'>
                                        <button className='big-btn' onClick={() => handleRemove(item)} type='submit'>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='cart-total-price'>
                    <p className='ps'>Total Price : <span>{total}</span></p>
                    <p className='ps'>Delivery Charges : <span>{total > 0 ? 40 : 0}</span></p>
                    <p className='cart-total-amount ps'>Payable Amount : <span>{total + (total > 0 ? 40 : 0)}</span></p>
                    <Link to="/checkout"><div className='cart-total-link'><button>Proceed to Pay</button></div></Link>
                </div>
            </div>
        </div>
    )
}

export default Cart

