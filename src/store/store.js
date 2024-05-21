import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user"

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})