import React from 'react'
import { Link } from "react-router-dom"
import "../Style/login.css"
import Navbar from '../Core/Navbar'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../Redux/user_information';
import {register_data} from '../Services/Operations/ProductAPI';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const { register, reset, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm();


    const onSubmit = async (data) => {
        console.log(data);
        try{
            const result = await register_data(data,navigate);
            console.log(result);
            if (result.status === 'exist') {
                return toast.error("user already exist");
                // throw new Error(result.data.message);
              }
              if (result.status === 'success') {
                dispatch(setSignupData(data));
                toast.success("Signup Successful")
                navigate('/login');
              }
        }
        catch(error){
            console.log("ERROR MESSAGE for register- ", error.message)
        }


    }
    if (isSubmitSuccessful) {
        reset({
            name:"",
            dob:"",
            phone:"",
            email:"",
            password:""
        })
    }

    return (
        <div className='login-wrapper'>
            <Navbar />
            <div className='login-container'>
                <div className='login-form'>
                    <h5>Signup</h5>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className='login-phone'>
                            <label htmlFor='name'>Enter Your Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Enter Your Number'
                                className='login-input'
                                {...register('name', { required: 'name is required' })}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className='login-phone'>
                            <label htmlFor='dob'>Enter Your DOB</label>
                            <input
                                type='date'
                                id='dob'
                                name='dob'
                                placeholder='Enter Your DOB'
                                className='login-input'
                                {...register('dob', { required: 'DOB is required' })}
                            />
                            {errors.dob && <p>{errors.dob.message}</p>}
                        </div>
                        <div className='login-phone'>
                            <label htmlFor='phone'>Enter the Phone Number</label>
                            <input
                                type='number'
                                id='phone'
                                name='phone'
                                placeholder='Enter The Phone Number'
                                className='login-input'
                                {...register('phone', { required: 'phonenumber is required' })}
                            />
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </div>
                        <div className='login-phone'>
                            <label htmlFor='email'>Enter Your Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter Your Email'
                                className='login-input'
                                {...register('email', { required: 'email is required' })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
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
                        <p className='login-text'>Don't have an account? <span><Link className='login-signup' to="/login">Login</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
