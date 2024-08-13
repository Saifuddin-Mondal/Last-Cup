import api from "../api";
import { product_endpoint, resturent_endpoint, popular_endpoint, register_endpoint, login_endpoint, cart_endpoint, update_profile_endpoint,check_endpoint } from '../api_endpoints'
const { PRODUCT_API, Particular_API } = product_endpoint;
const { DATA_API } = resturent_endpoint
const { Popular_API } = popular_endpoint
const { register_API } = register_endpoint
const { login_API } = login_endpoint
const { cart_add_API, cart_update_API } = cart_endpoint
const { update_profile_API, get_profile_API } = update_profile_endpoint;
const {checkout_API}=check_endpoint;

export const fetchProduct = async () => {
    let result = [];
    try {
        const response = await api.get(PRODUCT_API);
        result = response.data;
    }
    catch {
        console.log("GET_ALL_PRODUCT_API_ERROR..........")
    }
    return result;
}

export const fetchParticularProduct = async ({ categoryId }) => {
    let result = [];
    try {
        const response = await api.get(Particular_API, { params: { category_id: categoryId } });
        result = response.data;
        console.log("fetch product")
    }
    catch {
        console.log("GET_PARTICULAR_PRODUCT_API_ERROR..........")
    }
    return result;
}

export const fetchResturentProduct = async () => {
    let result = [];
    try {
        const response = await api.get(DATA_API);
        result = response.data;
    }
    catch {
        console.log("GET_PARTICULAR_PRODUCT_API_ERROR..........")
    }
    return result;
}
export const fetchPopularProduct = async () => {
    let result = [];
    try {
        const response = await api.get(Popular_API);
        result = response.data;
    }
    catch {
        console.log("GET_PARTICULAR_PRODUCT_API_ERROR..........")
    }
    return result;
}
export const register_data = async (data) => {
    let result = [];
    try {
        // console.log(">>>>>>>saifuddin<<<<<<<<<<<")
        const response = await api.post(register_API, data);
        result = response.data;
        // console.log("........................")
        return result;
    }
    catch (error) {
        console.log("GET_register_API_ERROR..........")
    }
}
export const login_data = async (data) => {
    let result = [];
    try {
        console.log(">>>>>>>saifuddin<<<<<<<<<<<");
        const response = await api.post(login_API, data);
        result = response.data;
        return result;
    }
    catch (error) {
        console.log("GET_login_API_ERROR..........")
    }
}

export const cart_data = async (item) => {
    try {
        const { id, qty, banner_image, user_id } = item;
        const payload = { prod_id: id, qty, banner_image, user_id };
        console.log(">>>>>>>saifuddin<<<<<<<<<<<", payload);
        const response = await api.post(cart_add_API, { products: [payload] });
        return response;
    }
    catch (error) {
        console.log("GET_cart_API_ERROR..........");
    }
}
export const getCart_data = async (user) => {
    try {
        console.log("user", user);
        // const { user_id } = user;
        // console.log("user",user_id);
        // console.log("user_id to fetch cart : ", user_id);
        const response = await api.get(`${cart_add_API}?user_id=${user}`);
        console.log("response popular cart data : ", response);
        return response;
    }
    catch (error) {
        console.log("GET_Allcart_API_ERROR..........");
    }
}
export const cart_update = async (user_id, id, quant, prod_price) => {
    try {
        console.log("<<<<<<<<<<<<<<<<<")
        const payload = {
            "user_id": user_id,
            "cart_items": [
                {
                    "prod_id": Number(id),
                    "qty": Number(quant),
                    "prod_price": Number(prod_price)
                }
            ]
        };

        const response = await api.post(cart_update_API, payload);
        console.log("Saifuddin.........mondal....")
        return response;
    }
    catch (error) {
        console.log("GET_cartUpdate_API_ERROR..........");
    }
}
export const cart_delete = async (id) => {
    try {
        const response = await api.delete(`${cart_add_API}/${id}`);
        console.log("Saifuddin.........mondal....")
        return response;
    }
    catch (error) {
        console.log("GET_cartUpdate_API_ERROR..........");
    }
}
export const update_profile = async (data) => {
    try {
        console.log("update data : ", data);
        const response = await api.post(update_profile_API, data);
        return response;
    }
    catch (error) {
        console.log("GET_update_profile_API_ERROR..........");
    }
}
export const get_profile = async (user) => {
    try {
        console.log(user)
        const user_id=user.user_id
;        console.log("Rana", user)
        const response = await api.get(`${get_profile_API}?user_id=${user_id}`);
        console.log("Rana", user)
        return response;
    }
    catch (error) {
        console.log("GET_update_profile_API_ERROR..........");
    }
}

export const get_checkout = async (data) => {
    try {
;       console.log("Rana",data)
        const response = await api.post(checkout_API,data);
        console.log("Rana",response)
        return response;
    }
    catch (error) {
        console.log("GET_update_profile_API_ERROR..........");
    }
}