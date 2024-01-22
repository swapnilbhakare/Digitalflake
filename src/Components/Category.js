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

  const authToken = useSelector(
    (state) => state.auth.user.user.data.accessToken
  );
  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [authToken]
  );

  const handleAddNewClick = () => {
    setShowAddCategory(true);
    setEditCategoryId(null);
  };

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

  const handleSaveCategory = async () => {
    if (!formData.name || !formData.description || !formData.status) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
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

    setShowAddCategory(false);
    setFormData({
      name: "",
      description: "",
      status: "",
    });
  };

  const handleCancel = () => {
    setShowAddCategory(false);
    setFormData({
      name: "",
      description: "",
      status: "",
    });
    setEditCategoryId(null);
  };

  const handleEdit = (_id) => {
    const categoryToEdit = categories?.categories.find(
      (category) => category._id === _id
    );
    console.log("handle edit", categoryToEdit);

    if (categoryToEdit) {
      setShowAddCategory(true);
      setEditCategoryId(_id);
      setFormData(categoryToEdit);
    }
  };

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

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value.target ? value.target.value : value,
    }));
  };

  const columns = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    { key: "action", title: "" },
  ];

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
