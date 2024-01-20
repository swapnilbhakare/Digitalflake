import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    editCategory: (state, action) => {
      const { id, updatedData } = action.payload;
      const categoryIndex = state.findIndex((category) => category.id === id);

      if (categoryIndex !== -1) {
        state[categoryIndex] = { ...state[categoryIndex], ...updatedData };
      }
    },
    deleteCategory: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((category) => category.id !== idToDelete);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
