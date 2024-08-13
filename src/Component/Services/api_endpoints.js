const baseURL= process.env.REACT_APP_BASE_URL;

//category endpoint
export const product_endpoint={
    PRODUCT_API:baseURL+"/category-details",
    Particular_API:baseURL+"/product/filter-by-category",
}

//feature resturents endpoint
export const resturent_endpoint={
    DATA_API:baseURL+"/restaurent-details",
}

//feature popular endpoint
export const popular_endpoint={
    Popular_API:baseURL+"/most-popular-product",
}
//register endpoint
export const register_endpoint={
    register_API:baseURL+"/register",
}

//login endpoint
export const login_endpoint={
    login_API:baseURL+"/login",
}

//cart endpoint
export const cart_endpoint={
    cart_add_API:baseURL+"/cart",
    cart_update_API:baseURL+"/cart/update",
}   

//update profile endpoint
export const update_profile_endpoint={
    update_profile_API:baseURL+"/updateUserProfile",
    get_profile_API:baseURL+"/userProfile",
}

//check endpoint
export const check_endpoint={
    checkout_API:baseURL+"/checkout",
}