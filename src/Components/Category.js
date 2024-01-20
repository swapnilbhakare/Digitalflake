import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import short from "short-uuid";
import AddItem from "./AddItem";
import ListContainer from "./UI/ListContainer";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../Store/categorySlice";
const Category = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const handleAddNewClick = () => {
    setShowAddCategory(true);
  };

  const handleSaveCategory = (isEdit) => {
    const newId = short.uuid();
    if (!formData.name || !formData.description || !formData.status) {
      toast.error("Please fill in all fields");
      return;
    }
    if (editCategoryId) {
      dispatch(editCategory({ id: editCategoryId, updatedData: formData }));
      toast.success("Category updated successfully");
    } else {
      dispatch(addCategory({ ...formData, id: newId }));
      toast.success("Category added successfully");
    }

    setShowAddCategory(false);
    setFormData({
      id: "",
      name: "",
      description: "",
      status: "",
    });
  };
  const handleEdit = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);

    if (categoryToEdit) {
      setShowAddCategory(true);
      setEditCategoryId(id);
      setFormData(categoryToEdit);
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    toast.success("Category deleted successfully");
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCancel = () => {
    setShowAddCategory(false);
    setFormData({
      id: "",
      name: "",
      description: "",
      status: "",
    });
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    { key: "action", title: "" },
  ];

  const tableHead = [
    { key: "id", title: "ID" },
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
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Category;
