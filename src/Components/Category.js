import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_URL } from "../utils/constants";

import AddItem from "./AddItem";
import ListContainer from "./UI/ListContainer";
import {
  setCategory,
  addCategory,
  editCategory,
  deleteCategory,
} from "../Store/categorySlice";
import axios from "axios";
const Category = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  // Geting authentication token from Redux store

  const authToken = useSelector((state) => state.auth.accessToken);

  // Memorizing configuration object for API requests

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [authToken]
  );

  // Fetching categories from the server when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/categories/fetch-category`,
          config
        );

        dispatch(setCategory(response.data?.data));
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, [dispatch, config]);

  // Saveing or updating a category

  const handleSaveCategory = async () => {
    // Validating form data

    if (!formData.name || !formData.description || !formData.status) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      // Sending HTTP request to save or update the category
      if (editCategoryId) {
        await axios.put(
          `${API_URL}/categories/update-category/${editCategoryId}`,
          formData,
          config
        );

        dispatch(editCategory({ _id: editCategoryId, updatedData: formData }));
        toast.success("Category updated successfully");
        setEditCategoryId(null);
      } else {
        const response = await axios.post(
          `${API_URL}/categories/add-category`,
          formData,
          config
        );

        dispatch(addCategory(response.data.data));

        toast.success("Category added successfully");
      }
    } catch (error) {
      console.error("Error saving category:", error.message);
      toast.error("Error saving category");
    }
    // Reseting form data and hide the add category form
    setShowAddCategory(false);
    setFormData({
      name: "",
      description: "",
      status: "",
    });
  };

  // Showing add category form
  const handleAddNewClick = () => {
    setShowAddCategory(true);
    setEditCategoryId(null);
  };
  // Canceling adding/editing a category and reset the form
  const handleCancel = () => {
    setShowAddCategory(false);
    setFormData({
      name: "",
      description: "",
      status: "",
    });
    setEditCategoryId(null);
  };
  // Edit a category
  const handleEdit = (_id) => {
    const categoryToEdit = categories?.categories.find(
      (category) => category._id === _id
    );

    if (categoryToEdit) {
      setShowAddCategory(true);
      setEditCategoryId(_id);
      setFormData(categoryToEdit);
    }
  };
  // Delete a category
  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `${API_URL}/categories/delete-category/${_id}`,
        config
      );

      dispatch(deleteCategory(_id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
      toast.error("Error deleting category");
    }
  };
  // Handling input change in the add/edit category form

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value.target ? value.target.value : value,
    }));
  };

  // Defineed columns for the list container

  const columns = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    { key: "action", title: "" },
  ];
  // Defineed table head for the list container

  const tableHead = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    { key: "action", title: "" },
  ];

  return (
    <>
      {showAddCategory ? (
        <AddItem
          title="Category"
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSaveCategory}
          onCancel={handleCancel}
        />
      ) : (
        <ListContainer
          title="Category"
          columns={columns}
          tableHead={tableHead}
          onClick={handleAddNewClick}
          data={categories.categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Category;
