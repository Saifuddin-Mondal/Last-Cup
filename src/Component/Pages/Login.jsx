import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../Style/login.css"
import Navbar from '../Core/Navbar'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setSignupData } from '../Redux/user_information';
import { login_data } from '../Services/Operations/ProductAPI';
import { useDispatch } from 'react-redux';
import { setLoginData, setSignupData, setuserId } from '../Redux/user_information';
import { get_profile } from '../Services/Operations/ProductAPI';
import { getCart_data } from '../Services/Operations/ProductAPI';
import { addCart, addOrder } from '../Redux/Cart-system';
import { Commet } from 'react-loading-indicators';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { register, reset, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const result = await login_data(data);
            console.log(result);
            if (result.status === 'success') {
                try {
                    setLoading(true)
                    console.log("Saifuddin.......")
                    const response = await get_profile(result);
                    const response1 = await getCart_data(result.user_id);
                    console.log("all cart data", response1)
                    console.log("response : ", response);
                    console.log("Saifuddin.......")
                    if (response.data.status === "success" && (response1.data.status === "success" || response1?.data?.status !== 'success')) {
                        console.log("Saifuddin.......")
                        dispatch(setSignupData(response.data.data));
                        dispatch(setLoginData(data));
                        dispatch(addCart(response1.data.data));
                        console.log("Saifuddin.......")
                        const response_OrderState = response1.data.data;
                        // setOrderStateData(response.data.data);
                        console.log("response_OrderState", response_OrderState);
                        response_OrderState.map((item) => {
                            const id = item.prod_id.toString();;
                            dispatch(addOrder({ id }));
                        })
                        console.log(result.user_id);
                        dispatch(setuserId({ user_id: result.user_id }));
                        toast.success("Login Successfully");
                        navigate('/');
                    }
                    loading(false);
                }
                catch (error) {
                    console.log("ERROR MESSAGE for store signup- ", error.message)
                    loading(false);
                }
            }
        }
        catch (error) {
            console.log("ERROR MESSAGE for login- ", error.message)
        }

    }

    if (isSubmitSuccessful) {
        reset({
            phone: '',
            password: ""
        });
    }

    return (
        <div className='login-wrapper'>
            <Navbar />
            <div className='login-container'>
                {
                    loading ? <div className='Loading-section'>
                        <Commet color="#32cd32" size="medium" text="" textColor="" />
                        <p>Loading....</p>
                    </div> :
                        <div className='login-form'>
                            <h5>Login</h5>
                            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                <div className='login-phone'>
                                    <label htmlFor='phone'>Enter the Phone Number</label>
                                    <input
                                        type='number'
                                        id='phone'
                                        name='phone'
                                        placeholder='Enter The Phone Number'
                                        className='login-input'
                                        {...register('phone', { required: 'phone no is required' })}
                                    />
                                    {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                                </div>
                                <div className='login-phone'>
                                    <label htmlFor='password'>Enter Your Password</label>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='Enter Your Password'
                                        className='login-input'
                                        {...register('password', { required: 'password is required' })}
                                    />
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                                <button className='form-btn'>Submit</button>
                                <p className='login-text'>Don't have an account? <span><Link className='login-signup' to="/signup">Signup</Link></span></p>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}

export default Login
