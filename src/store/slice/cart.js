import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    }, 
    reducers: {
        addToCart : (state, action) => {
            const existingItem = state.cartItem.find(item => item.id === action.payload.id);

            if (existingItem) {
                // Item already exists, update quantity
                const updatedCart = state.cartItem.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: item.quantity + action.payload.quantity };
                } else {
                    return item;
                }
                });
                state.cartItem = updatedCart; // Update state directly (Immer handles immutability)
            } else {
                // New item, add to cart
                state.cartItem.push(action.payload); // Update state directly (Immer handles immutability)
            }

            // Persist cart data to local storage
            localStorage.setItem('cart', JSON.stringify(state.cartItem));
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
        emptyCart : (state, action) => {
            state.cartItem = [];
            localStorage.removeItem("cart");
        }
          
    }
})


export const { addToCart, removeFromCart, updateCartItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
