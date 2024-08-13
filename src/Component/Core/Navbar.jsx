import React from 'react'
import { Link } from 'react-router-dom'
// import { FaMapMarkerAlt} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import '../Style/Navbar.css'
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Navbar = () => {
    const { totalItem } = useSelector((state) => state.cart);
    const { loginData, signupData } = useSelector((state) => state.user);
    const [mobileIcon, setMobileIcon] = useState(false);
    const handlerIcon = () => {
        setMobileIcon(prev => !prev)
    }
    return (
        <div className='navbar-wrapper'>
            <div className='navbar-section-container'>
                <div className='navbar-container'>
                    <div className='navbar-image'>
                        <Link className='navbar-image-link' to='/'>
                            <img src='Assets/img/favicons/Icon1.jpeg' alt='logo' width="60" />
                            <span className='navbar-span'>LastCup</span>
                        </Link>
                    </div>
                    <div className={`${mobileIcon ? "main-nav mobile-main-nav" : "main-nav"}`}>
                        {/* <div className={`${mobileIcon ? "navbar-location mobile-navbar-location" : "navbar-location"}`}>
                        <p><span className='navbar-location-span'>Deliver to : </span><FaMapMarkerAlt style={{ color: 'orange' }} /> <span>Current Location</span> <span className='navbar-location-span1 navbar-location-span'>Mirpur 1 Bus Stand, Dhaka</span></p>
                    </div> */}
                        <div className={`${mobileIcon ? "nav-icon-cart mobile-nav-icon-cart" : "nav-icon-cart"}`}>
                            {/* <Link style={{position:"relative"}} to="/cart"><IoCartSharp style={{ fontSize: "25px", color: "black",margin: "0px 20px" }} />
                            {totalItem > 0 ?
                                <div className='nav-total'>{totalItem}</div>
                                : ""}
                        </Link> */}

                            <div className={`${mobileIcon ? "navbar-input-button mobile-navbar-input-button" : "navbar-input-button"}`}>
                                <IoSearch className='navbar-icon' />
                                <input className='navbar-input-button1' type='text' placeholder="Search Food" name='search' id='search' />
                                {
                                    !loginData ?
                                        <Link className='mobile-food-btn' to='/login'><button type='submit'><FaUser className='navbar-input-button2' /> Login</button></Link>
                                        :
                                        <Link className='user-profile' to="/profile">
                                            <p>Hi,</p>
                                            <p>{signupData.name}</p>
                                        </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='navbar-cart-menu'>
                    <Link style={{ position: "relative" }} to="/cart"><IoCartSharp className='navbar-link-cart-total' style={{ fontSize: "25px", color: "black", marginRight:"20px" }} />
                        {totalItem > 0 ?
                            <div className='nav-total'>{totalItem}</div>
                            : ""}
                    </Link>
                    <div className='navbar-menu-icon' onClick={handlerIcon}>
                        <GiHamburgerMenu />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Navbar
