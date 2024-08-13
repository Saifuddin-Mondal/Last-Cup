import { createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import Cookies from "js-cookie"

const initialState = {
    orderState: Cookies.get('orderState') ? JSON.parse(Cookies.get('orderState')) : [],
    All_cart: Cookies.get('All_cart') ? JSON.parse(Cookies.get('All_cart')) : [],
    totalItem: localStorage.getItem('totalItem') ? localStorage.getItem('totalItem') : 0,
    total: Cookies.get('total') ? JSON.parse(Cookies.get('total')) : 0,
}

export const Cart_system = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart:(state,action)=>{
            state.All_cart = action.payload;
            console.log("all cart data : ",state.All_cart);
            Cookies.set('All_cart', JSON.stringify(state.All_cart));
            console.log("all cart data : ",state.All_cart);
        },
        addOrder: (state, action) => {
            const { id } = action.payload;
            console.log("id : ",{id});
            if (!Array.isArray(state.orderState)) {
                state.orderState = []; // Reset to empty array if it's not an array
            }
            // const existingOrderIndex = state.orderState.findIndex(order => order.id === id);
            // console.log("existance order Index : ",existingOrderIndex);
            // if (existingOrderIndex === -1) {
                state.orderState.push({id});
                state.totalItem++;
            // }
            console.log("state.orderstate : ",state.orderState);

            Cookies.set('orderState', JSON.stringify(state.orderState));
            localStorage.setItem('totalItem', state.totalItem);
        },
        removeOrder: (state, action) => {
            const {id} = action.payload;
            console.log("id",id);
            if (!Array.isArray(state.orderState)) {
                state.orderState = []; // Reset to empty array if it's not an array
            }
            state.orderState = state.orderState.filter(order => order.id !== JSON.stringify(id));
            console.log("orderState : ",state.orderState);
            state.totalItem--;
            console.log("state.orderstate : ",state.orderState);
            Cookies.set('orderState', JSON.stringify(state.orderState));
            localStorage.setItem('totalItem', state.totalItem);
        },
        loadOrder: (state, action) => {
            const payload = action.payload;
            if (Array.isArray(payload)) {
                state.orderState = payload;
            } else {
                state.orderState = []; // Default to empty array if payload is not an array
            }
        },
        add_total: (state, action) => {
            state.total = action.payload;
            Cookies.set('total', JSON.stringify(state.total));
        },
        logout_Cart(state) {
            state.All_cart = [];
            state.orderState = [];
            state.totalItem = 0;
            state.total = 0;

            Cookies.set('All_cart', JSON.stringify(state.All_cart));
            Cookies.set('orderState', JSON.stringify(state.orderState));
            localStorage.setItem('totalItem', state.totalItem);
            Cookies.set('total', JSON.stringify(state.total));
        },
    },

})
export const {addOrder, removeOrder, loadOrder,add_total,addCart,logout_Cart } = Cart_system.actions

export default Cart_system.reducer