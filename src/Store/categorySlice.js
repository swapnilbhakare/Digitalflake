import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action) => {
      const { _id, updatedData } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category._id === _id
      );

      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = {
          ...state.categories[categoryIndex],
          ...updatedData,
        };
      }
    },
    deleteCategory: (state, action) => {
      const idToDelete = action.payload;
      state.categories = state.categories.filter(
        (category) => category._id !== idToDelete
      );
    },
  },
});

export const { setCategory, addCategory, editCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
