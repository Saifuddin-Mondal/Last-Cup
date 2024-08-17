import React, { useEffect, useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
// import { Link } from "react-router-dom"
import "../Style/login.css"
import "../Style/Profile.css"
import "../Style/Checkout.css";
import Navbar from '../Core/Navbar'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { logout } from '../Redux/user_information';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { update_profile, get_profile, get_order_history } from '../Services/Operations/ProductAPI';
import { toast } from 'react-toastify';
import { setSignupData } from '../Redux/user_information';
import { logout_Cart } from '../Redux/Cart-system';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.user);
    const [profileImage, setProfileImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [logoutProfile, setLogout] = useState(false);
    const [profile, setProfile] = useState(true);
    const [history, setHistory] = useState();
    const [order, setOrder] = useState(false);
    const { signupData } = useSelector((state) => state.user);

    const handleProfile = () => {
        setProfile(true);
        setLogout(false);
        setOrder(false);
    }
    const handleOrder = () => {
        setProfile(false);
        setLogout(false);
        setOrder(true);
    }
    const handleLogOut = () => {
        setProfile(false);
        setLogout(true);
        setOrder(false);
    }
    const handleLogOutfromLogin = () => {
        dispatch(logout());
        dispatch(logout_Cart());
        navigate("/");
    }

    const handleProfileUpdate = async (data) => {
        try {
            const user_id = userId.user_id;

            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('dob', data.dob);
            formData.append('email', data.email);
            formData.append('address', data.location);

            // Check if a new profile image is selected
            if (data.profile && data.profile[0]) {
                formData.append('profile_image', data.profile[0]);
            }

            const response = await update_profile(formData);

            if (response.status === 200) {
                const response = await get_profile(userId);
                console.log("profile data", response.data.data);
                if (response.status === 200) {
                    console.log("don")
                    dispatch(setSignupData(response.data.data));
                    setProfileImage(response.data.data.profile_image)
                    console.log("don1");
                }
                // dispatch(setSignupData({
                //     name: data.name,
                //     phone: data.phone,
                //     dob: data.dob,
                //     email: data.email,
                //     address: data.location || signupData.address,
                //     profile_image: data.profile[0]?.name || signupData.profile_image,
                // }));

                // setProfileImage(data.profile[0]?.name || signupData.profile_image);
                toast.success("Profile Updated Successfully");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            toast.error("Profile update error");
            console.error("Error updating profile:", error);
        }
    }

    const onSubmit = (data) => {
        handleProfileUpdate(data);
    }

    useEffect(() => {
        const userProfile = (async () => {
            try {
                console.log("userId", userId);
                const response = await get_profile(userId);
                const response1 = await get_order_history(userId);
                console.log("order data : ", response1);
                console.log("profile data", response.data.data);
                if (response.status === 200 && response1.data.status === "success") {
                    console.log("don")
                    console.log("order history response : ", response1.data.data);
                    setHistory(response1.data.data);
                    dispatch(setSignupData(response.data.data));
                    setProfileImage(response.data.data.profile_image)
                    console.log("don1");
                }
            }
            catch (error) {
                console.error("Error get profile:", error);
            }
        })
        userProfile();
    }, [])

    console.log("signup data : ", signupData)
    // console.log("profile_image : ",profileImage)

    return (
        <div className='profile-wrapper'>
            <div className='profile-navbar'>
                <Navbar />
            </div>
            <div className='profile-container'>
                <div className='profile-name'>
                    <div className='profile-user'>
                        {
                            !profileImage ? <FaUserAlt className='profile-icon-user' /> : <img src={signupData.profile_image} alt="..." width="130" className='profile-icon-user' />
                        }
                        <h2>Saifuddin Mondal</h2>
                    </div>
                    <div className='profile-btn'>
                        <button type='button' onClick={handleProfile}>My Profile</button>
                        <button type='button' onClick={handleOrder}>Order History</button>
                        <button type='button' onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
                <div className='login-form profile-login'>
                    {profile ?
                        <form className='form' onSubmit={handleSubmit(onSubmit)}>
                            <div className='login-phone'>
                                <label htmlFor='name'>Enter Your Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    defaultValue={signupData.name}
                                    placeholder='Enter Your Number'
                                    className='login-input'
                                    {...register('name', { required: 'name is required' })}
                                />
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                            <div className='login-phone'>
                                <label htmlFor='email'>Enter Your Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    defaultValue={signupData.email}
                                    placeholder='Enter Your Email'
                                    className='login-input'
                                    {...register('email', { required: 'email is required' })}
                                />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                            <div className='login-phone'>
                                <label htmlFor='phone'>Enter Your Phone Number</label>
                                <input
                                    type='number'
                                    id='phone'
                                    name='phone'
                                    defaultValue={signupData.phone}
                                    placeholder='Enter The Phone Number'
                                    className='login-input'
                                    {...register('phone', { required: 'phone number is required' })}
                                />
                                {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                            </div>
                            <div className='login-phone'>
                                <label htmlFor='dob'>Enter Your DOB</label>
                                <input
                                    type='date'
                                    id='dob'
                                    name='dob'
                                    defaultValue={signupData.dob}
                                    placeholder='Enter Your DOB'
                                    className='login-input'
                                    {...register('dob', { required: 'DOB is required' })}
                                />
                                {errors.dob && <p>{errors.dob.message}</p>}
                            </div>
                            <div className='login-phone'>
                                <label htmlFor='location'>Enter Your Location</label>
                                <input
                                    type='text'
                                    id='location'
                                    name='location'
                                    defaultValue={signupData.address}
                                    placeholder='Enter Your Location'
                                    className='login-input'
                                    {...register('location')}
                                />
                                {errors.location && <p>{errors.location.message}</p>}
                            </div>
                            <div className='login-phone'>
                                <label htmlFor='profile'>Profile Picture</label>
                                <input
                                    type='file'
                                    id='profile'
                                    name='profile'
                                    {...register('profile')}
                                />
                                {errors.profile && <p>{errors.profile.message}</p>}
                            </div>
                            <button type='submit' className='form-btn'>Save</button>
                        </form>
                        : order ?
                            <div className='profile-header profile-header1 cart-header cart-item-header'>
                                <div className='cart-slider-list'>
                                    {
                                        history.map((item, id) => (
                                            <div className='cart-item' key={id}>
                                                <img src={item.banner_image} alt={`${item.title}`} />
                                                <div className='cart-ruppes-button checkout-btn-rupees'>
                                                    {/* <p className='cart-ruppes-button1'>{item.text1}</p> */}
                                                    <p className='rupees'>Price : ₹{item.prod_price}</p>
                                                    <p className='rupees'>Qty : {item.qty}</p>
                                                    <p className='rupees'>Order Date : <span className='order-data'>{item.order_date}</span></p>
                                                </div>
                                                <div className='cart-remove-btn'>
                                                    <p className='rupees'>Total : ₹{item.total_price}</p>
                                                    {/* <button className='big-btn btn-remove' onClick={() => Dispatch(removeFromCart(item))} type='submit'>Remove</button> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            : logoutProfile ? <div className='logout-section'>
                                <h3>Do you want to log out?</h3>
                                <button onClick={handleLogOutfromLogin}>Log Out</button>
                            </div> : ""}
                </div>
            </div>
        </div>
    )
}

export default Profile
