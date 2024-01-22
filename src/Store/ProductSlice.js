import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    editProduct: (state, action) => {
      const { _id, updatedData } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === _id
      );

      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedData,
        };
      }
    },
    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== idToDelete
      );
    },
  },
});

export const { addProduct, editProduct, deleteProduct, setProducts } =
  productSlice.actions;
export default productSlice.reducer;
