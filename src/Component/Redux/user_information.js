import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    signupData: localStorage.getItem('signupData') ? JSON.parse(localStorage.getItem('signupData')) : null,
    loginData: Cookies.get('loginData') ? JSON.parse(Cookies.get('loginData')) : null,
    userId: Cookies.get('userId') ? JSON.parse(Cookies.get('userId')) : null,
}

export const user_information = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
            localStorage.setItem('signupData', JSON.stringify(state.signupData));
        },
        logout(state) {
            state.loginData = null;
            state.userId = null;
            Cookies.remove('loginData');
            // localStorage.removeItem("signupData");
            Cookies.remove("userId");
            localStorage.removeItem("signupData");
            // localStorage.clear();
        },
        setLoginData(state, action) {
            state.loginData = action.payload;
            Cookies.set('loginData', JSON.stringify(state.loginData));
        },
        setuserId(state, action) {
            console.log("action payload : ", action.payload);
            state.userId = action.payload;
            Cookies.set('userId', JSON.stringify(state.userId));
            console.log("userId in state : ", state.userId);
        }
    }
});

export const { setSignupData, logout, setLoginData, setuserId } = user_information.actions;
export default user_information.reducer;
