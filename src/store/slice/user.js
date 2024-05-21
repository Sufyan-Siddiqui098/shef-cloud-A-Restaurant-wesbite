import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): "", 
        authToken: localStorage.getItem("auth") ? localStorage.getItem("auth") : ""
    }, 
    reducers: {
        signOutUser: (state)=>{
            window.localStorage.removeItem("auth");
            window.localStorage.removeItem("user");
            state.userInfo = "";
            state.authToken = "";
        }, 
        loginUser : (state, action)=>{
            state.userInfo = action.payload.data;
            state.authToken = action.payload.data.access_token;
        },
        updateUser: (state, action)=>{
            state.userInfo = action.payload;
        }
    }
})


export const {signOutUser, loginUser, updateUser} = userSlice.actions; 

export default userSlice.reducer;