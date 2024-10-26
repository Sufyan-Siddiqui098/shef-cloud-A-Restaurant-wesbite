import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("action ", action.payload);
      const chefIndex = state.cartItem.findIndex(
        (chef) =>
          chef.id === action.payload.user_id &&
          chef.delivery_date === action.payload.chef.delivery_date &&
          chef.delivery_slot === action.payload.chef.delivery_slot
      );

      // console.log("chef index ", chefIndex);
      if (chefIndex !== -1) {
        // Chef exists in cart
        const menuIndex = state.cartItem[chefIndex].menu.findIndex(
          (menu) => menu.id === action.payload.id
        );
        // console.log("menuindex ", menuIndex);

        if (menuIndex !== -1) {
          // Menu item exists for the chef, update quantity
          state.cartItem[chefIndex].menu[menuIndex].quantity +=
            action.payload.quantity;
          // console.log("qunatity increase ");
        } else {
          // Menu item doesn't exist, push new menu item
          state.cartItem[chefIndex].menu.push(action.payload);
          // console.log("push into same chef");
        }
      } else {
        const { chef, ...payload } = action.payload;
        // Chef doesn't exist in cart, create new chef object
        const newChef = {
          ...chef,
          menu: [payload],
        };
        state.cartItem.push(newChef);
        console.log("new entry");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
    removeFromCart: (state, action) => {
      const { chefIndex, menuIndex } = action.payload;
      // console.log("Action delete", action.payload)
      // Ensure chefIndex and menuIndex are valid
      if (chefIndex >= 0 && menuIndex >= 0) {
        const updatedMenu = state.cartItem[chefIndex].menu.filter(
          (menu, index) => index !== menuIndex
        );

        // Update the menu array for the chef
        state.cartItem[chefIndex].menu = updatedMenu;

        // Optionally remove chef if menu is empty after removal
        if (updatedMenu.length === 0) {
          state.cartItem.splice(chefIndex, 1);
        }

        // Update localStorage with updated cartItem
        localStorage.setItem("cart", JSON.stringify(state.cartItem));
      }
    },
    // updateCartItem: (state, action) => {
    //   const { chefIndex, menuIndex, key, value } = action.payload; // Destructure payload
    //   console.log("aciton", action.payload)

    //   if (chefIndex >= 0 && menuIndex >= 0) {
    //     const updatedMenu = state.cartItem[chefIndex].menu.map(
    //       (menu, index) => {
    //         if (index === menuIndex) {
    //           return { ...menu, [key]: value };
    //         } else {
    //           return { ...menu };
    //         }
    //       }
    //     );

    //     // Update the menu array for the chef
    //     state.cartItem[chefIndex].menu = updatedMenu;

    //     // Update localStorage with updated cartItem
    //     localStorage.setItem("cart", JSON.stringify(state.cartItem));
    //   }
    // },
    updateCartItem: (state, action) => {
      const { chefIndex, menuIndex, key, value } = action.payload;
      // console.log("actoin", action.payload)
      if (chefIndex >= 0 && menuIndex >= 0) {
        // Create a new menu array with the updated item
        const updatedMenu = state.cartItem[chefIndex].menu.map(
          (menu, index) => {
            if (index === menuIndex) {
              return { ...menu, [key]: value };
            }
            return menu;
          }
        );

        // Create a new cartItem array with the updated menu
        const updatedCartItem = state.cartItem.map((item, index) => {
          if (index === chefIndex) {
            return { ...item, menu: updatedMenu };
          }
          return item;
        });

        // Create a new state object with the updated cartItem
        const newState = {
          ...state,
          cartItem: updatedCartItem,
        };

        // Update localStorage with the new state
        localStorage.setItem("cart", JSON.stringify(newState.cartItem));

        return newState;
      }

      return state;
    },

    emptyCart: (state, action) => {
      state.cartItem = [];
      localStorage.removeItem("cart");
    },
    onOrderSubmit: (state, action) => {
      // const { chefId } = action.payload;
      // // console.log("chefId in onSubmit reducer ", chefId)
      //   const updatedCart = state.cartItem.filter(
      //     (chef, index) => chef.id !== chefId
      //   );
      //   // console.log("updated cart ", updatedCart)
      // if(updatedCart){
      //   state.cartItem = updatedCart;
      // } else {
      //   state.cartItem = [];
      // }
      // // console.log("update ", updatedCart);
      // localStorage.setItem("cart", JSON.stringify(state.cartItem));

      const { chefId, delivery_date, delivery_slot } = action.payload;
      // chef index
      const chefIndex = state.cartItem.findIndex(
        (chef) =>
          chef.id === chefId &&
          chef.delivery_date === delivery_date &&
          chef.delivery_slot === delivery_slot
      );
      let updatedCart = [];
      // if chef index found
      if (chefIndex !== -1) {
        // console.log("inside chef index ");
        updatedCart = state.cartItem.filter(
          (chef, index) => index !== chefIndex
        );
      }
      // console.log("updated cart ", updatedCart);
      if (updatedCart) {
        state.cartItem = updatedCart;
      } else {
        state.cartItem = [];
      }
      // console.log("update ", updatedCart);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  emptyCart,
  onOrderSubmit,
} = cartSlice.actions;
export default cartSlice.reducer;
