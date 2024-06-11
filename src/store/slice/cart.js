import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    }, 
    reducers: {
        addToCart : (state, action) => {
            state.cartItem.push(action.payload);
            localStorage.setItem("cart", JSON.stringify([...state.cartItem]));
        },
        removeFromCart : (state, action) => {
            const updatedCart = state.cartItem.filter(
                (product, index) => index !== action.payload
              );
              state.cartItem = updatedCart;
              localStorage.setItem("cart", JSON.stringify(updatedCart));
        }, 
        updateCartItem: (state, action) => {
            const { productIndex, key, value } = action.payload; // Destructure payload
          
            const updatedCart = state.cartItem.map((item, index)=> {
                if( index === productIndex ) {
                    return {...item, [key]: value}
                } else {
                    return {...item}
                }
            })
            state.cartItem = updatedCart;
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          },
          
    }
})


export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
