import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },

    editProduct: (state, action) => {
      const { id, updatedData } = action.payload;
      const productIndex = state.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        state[productIndex] = { ...state[productIndex], ...updatedData };
      }
    },

    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((product) => product.id !== idToDelete);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
