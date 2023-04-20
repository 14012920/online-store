import { createSlice } from '@reduxjs/toolkit';

 const initialState= {
    cartCount: 0,
    cartProducts: [],
    total: 0,
  }
const cartSlice = createSlice({
  name: 'cart',
 initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('action', state.cartProducts, action);
      state.cartCount += 1;
      let tempArray = [];
      tempArray.push(action.payload);
      state.cartProducts = tempArray;
      state.total += parseInt(action.payload.price) * action.payload.currentQty;
    },
    resetCart:()=>initialState
  },
});
export const { addToCart,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
