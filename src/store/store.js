import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user"
import cartReducer from "./slice/cart"

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})