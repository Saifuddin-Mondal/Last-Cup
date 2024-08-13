import React from 'react'
import { Link } from "react-router-dom"
import "../Style/login.css"
import Navbar from '../Core/Navbar'
import { useForm } from 'react-hook-form';

const Otp = () => {
    const { register,reset, handleSubmit, formState: {isSubmitSuccessful, errors } } = useForm();

    const onSubmit=(data)=>{
        console.log(data);
    }
    if(isSubmitSuccessful){
        reset({
            phonenumber: '',
        })
    }

  return (
    <div className='login-wrapper'>
            <Navbar />
            <div className='login-container'>
                <div className='login-form'>
                    <h5>One Time Password (OTP)</h5>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className='login-phone'>
                            <label htmlFor='phone'>Enter the OTP</label>
                            <input
                                type='number'
                                id='phone'
                                name='phonenumber'
                                placeholder='Enter The OTP'
                                className='login-input'
                                {...register ('phonenumber', {required : 'name is required'})}
                            />
                            {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                        </div>
                        <button className='form-btn'>Submit</button>
                        <p className='login-text'>Don't Receive? <span><Link className='login-signup' to="/signup">Resend</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Otp
