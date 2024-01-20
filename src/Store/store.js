import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./ProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

export default store;
