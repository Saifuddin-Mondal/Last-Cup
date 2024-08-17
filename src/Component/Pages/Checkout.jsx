import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
// import {add_total,addCart } from '../Redux/Cart-system';
import "../Style/Cart.css";
import "../Style/Checkout.css";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Footer from '../Core/Footer';
import { get_checkout } from '../Services/Operations/ProductAPI';
import { removeOrder } from '../Redux/Cart-system';
import { Commet } from 'react-loading-indicators';


const Checkout = () => {
    const { register, reset, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const { userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { All_cart, total } = useSelector((state) => state.cart);

    const [pickup, setPickup] = useState(true);
    const [order, setOrder] = useState(false);
    const clickHandler1 = () => {
        setPickup(true)
    }
    const clickHandler2 = () => {
        setPickup(false)
    }

    // console.log("Cart data : ",All_cart)
    // console.log("Cart total : ",total)

    const onSubmit = async (data) => {
        console.log(data);
        try {
            setLoading(true)
            const userid = userId.user_id;
            console.log(userid);
            const result = { ...data, user_id: userid }
            console.log("result : ", result);
            const response = await get_checkout(result);
            console.log(response);
            if (response.data.status === "success") {
                setOrder(true);
                All_cart.forEach((cart) => {
                    const cart_id = cart.prod_id;
                    console.log("checkout cart id : ", cart_id);
                    dispatch(removeOrder({ id: cart_id }));
                });
            }
            setLoading(false);

        }
        catch (error) {
            console.error("Error checkout:", error);
            setLoading(false)
        }


    }

    if (isSubmitSuccessful) {
        reset({
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            time: ""
        })
    }

    return (
        <div className='profile-wrapper'>
            {
                loading ? <div className='Loading-section'>
                    <div className='commet-container'>
                        <Commet color="#32cd32" size="medium" text="" textColor="" />
                        <p>Loading....</p>
                    </div>
                </div> :
                    <div className={`profile-section ${order ? "profile-active" : ""}`}>
                        <div className='profile-container checkout-container'>
                            <div className='profile-header checkout-wrapper'>
                                <h1>Customer Details</h1>
                                <div className='checkout-del-pic'>
                                    <button className='checkour-btn' onClick={clickHandler1}>Delivery</button>
                                    <button className='checkour-btn' onClick={clickHandler2}>Pickup</button>
                                </div>
                                {pickup ? <div className='login-form checkout-form'>
                                    <p>Add New Address</p>
                                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='name'
                                                name='name'
                                                placeholder='Name'
                                                className='login-input'
                                                {...register('name', { required: 'name is required' })}
                                            />
                                            {errors.name && <p>{errors.name.message}</p>}
                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='number'
                                                id='phone'
                                                name='phone'
                                                placeholder='Phone'
                                                className='login-input'
                                                {...register('phone', { required: 'phonenumber is required' })}
                                            />
                                            {errors.phone && <p>{errors.phone.message}</p>}
                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='address'
                                                name='address'
                                                placeholder='address'
                                                className='login-input'
                                                {...register('address', { required: 'address is required' })}
                                            />
                                            {errors.address && <p>{errors.address.message}</p>}
                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='city'
                                                name='city'
                                                placeholder='City'
                                                className='login-input'
                                                {...register('city', { required: 'city is required' })}
                                            />
                                            {errors.city && <p>{errors.city.message}</p>}
                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='state'
                                                name='state'
                                                placeholder='state'
                                                className='login-input'
                                                {...register('state', { required: 'state is required' })}
                                            />
                                            {errors.state && <p>{errors.state.message}</p>}

                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='country'
                                                name='country'
                                                placeholder='Country'
                                                className='login-input'
                                                {...register('country', { required: 'country is required' })}
                                            />
                                            {errors.location && <p>{errors.location.message}</p>}
                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                type='text'
                                                id='zip'
                                                name='zip'
                                                placeholder='Zip'
                                                {...register('zip', { required: 'zip is required' })}
                                            />
                                            {errors.profile && <p>{errors.profile.message}</p>}
                                        </div>
                                        <div className='checkout-del-timing'>
                                            <div>
                                                <p>Select Delivery Timing:</p>
                                            </div>
                                            <div className='checkout-input'>
                                                <input type="radio" id="time" name="delivery" value="0"
                                                    {...register('time', { required: 'Delivery timing is required' })}
                                                />
                                                <label for="delivery">Within 1hr</label>
                                                <input type="radio" id="time" name="delivery" value="1"
                                                    {...register('time', { required: 'Delivery timing is required' })}
                                                />
                                                <label for="delivery">1-3 hrs</label>
                                            </div>
                                        </div>
                                        <div className='cart-total-link1'>
                                            <button type='submit'>Proceed To Pay</button>
                                        </div>
                                    </form>
                                </div>
                                    :
                                    <div className='checkout-del-timing'>
                                        <div>
                                            <p className='checkout-del-timing-pa'>Select Pickup Timing:</p>
                                        </div>
                                        <div className='checkout-input'>
                                            <input type="radio" id="delivery" name="delivery" value="Within 1hr" />
                                            <label for="delivery">Within 1hr</label>
                                            <input type="radio" id="delivery" name="delivery" value="1-3 hrs" />
                                            <label for="delivery">1-3 hrs</label>
                                        </div>
                                        <div className='cart-total-link1'>
                                            <button>Proceed To Pay</button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='cart-header cart-item-header'>
                                <h3>Items</h3>
                                <div className='cart-slider-list'>
                                    {
                                        All_cart.map((item, id) => (
                                            <div className='cart-item' key={id}>
                                                <img src={item.banner_image} alt={`${item.title}`} />
                                                <div className='cart-ruppes-button checkout-btn-rupees'>
                                                    <p className='cart-ruppes-button1'>{item.text1}</p>
                                                    <p className='rupees'>Price : ₹{item.prod_price}</p>
                                                    <p className='rupees'>Qty : {item.qty}</p>
                                                </div>
                                                <div className='cart-remove-btn'>
                                                    <p className='rupees'>Total : ₹{item.total_price}</p>
                                                    {/* <button className='big-btn btn-remove' onClick={() => Dispatch(removeFromCart(item))} type='submit'>Remove</button> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='login-form checkout-form price-checkout'>
                                    <div className='price-summery'>
                                        <p>Price Summary</p>
                                    </div>
                                    <form className='form'>
                                        <div className='login-phone checkout-coupon checkout-coupon1'>
                                            <input
                                                type='text'
                                                id='location'
                                                name='location'
                                                placeholder='Enter Cupon Code'
                                                className='login-input'
                                            />
                                            <button>Apply Coupon</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='checkout-wal-balance'>
                                    <p>Wallet Balance</p>
                                    <div className='checkout-coupon'>
                                        <p>$</p>
                                        <button>Apply Wallet Button</button>
                                    </div>
                                </div>
                                <div className='cart-total-price cart-del'>
                                    <p className='ps'>Total Price : <span>{total}</span></p>
                                    <p className='ps'>Delivery Charges : <span>{total > 0 ? 40 : 0}</span></p>
                                    <p className='cart-total-amount ps'>Payable Amount : <span>{total + (total > 0 ? 40 : 0)}</span></p>
                                    {/* <Link to="/checkout" className='cart-total-link'><button>Proceed to Pay</button></Link> */}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
            }
            {
                order ? <div className='order-section-complete'>
                    <p>Order is successfully completed</p>
                    <Link className='order-link-btn' to="/" onClick={() => { setOrder(false) }}><byttton>Click For Go To Home</byttton></Link>
                </div> : ""
            }



        </div>
    )
}

export default Checkout
