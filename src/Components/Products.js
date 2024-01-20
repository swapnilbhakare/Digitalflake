import React, { useState } from "react";

import { toast } from "react-toastify";
import AddItem from "./AddItem";
import ListContainer from "./UI/ListContainer";
import { addProduct, editProduct, deleteProduct } from "../Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import short from "short-uuid";
const Products = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    packSize: "",
    category: "",
    mrp: "",
    image: "",
    status: "",
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const handleAddNewClick = () => {
    setShowAddProduct(true);
    setEditProductId(null);
  };

  const handleSaveProduct = () => {
    const newId = short.generate();
    if (
      (!editProductId && !formData.image) ||
      !formData.name ||
      !formData.packSize ||
      !formData.category ||
      !formData.mrp ||
      !formData.status
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.image instanceof File) {
      const imageUrl = URL.createObjectURL(formData.image);

      setFormData((prevFormData) => ({
        ...prevFormData,
        id: newId,
      }));

      if (editProductId) {
        dispatch(
          editProduct({
            id: editProductId,
            updatedData: {
              name: formData.name,
              packSize: formData.packSize,
              category: formData.category,
              mrp: formData.mrp,
              image: imageUrl,
              status: formData.status,
            },
          })
        );
        toast.success("Product updated successfully");
      } else {
        dispatch(
          addProduct({
            id: newId,
            name: formData.name,
            packSize: formData.packSize,
            category: formData.category,
            mrp: formData.mrp,
            image: imageUrl,
            status: formData.status,
          })
        );
        toast.success("Product added successfully");
      }
      setShowAddProduct(false);
      setFormData({
        id: "",
        name: "",
        packSize: "",
        category: "",
        mrp: "",
        image: "",
        status: "",
      });
    } else {
      console.error("Invalid image file");
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);

    if (productToEdit) {
      setShowAddProduct(true);
      setEditProductId(id);
      setFormData(productToEdit);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted successfully");
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleCancel = () => {
    setShowAddProduct(false);
    setFormData({
      id: "",
      name: "",
      packSize: "",
      category: "",
      mrp: "",
      image: "",
      status: "",
    });
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "packSize", title: "Pack Size" },
    {
      key: "category",
      title: "Category",
      type: "select",
      options: ["milk", "bread", "others"],
    },
    { key: "mrp", title: "MRP", type: "number" },
    { key: "image", title: "Image", type: "file" },
    {
      key: "status",
      title: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const tableHead = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "packSize", title: "Pack Size" },
    {
      key: "category",
      title: "Category",
      type: "select",
      options: ["milk", "bread", "others"],
    },
    { key: "mrp", title: "MRP", type: "number" },
    { key: "image", title: "Image", type: "file" },
    {
      key: "status",
      title: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  return (
    <>
      {showAddProduct ? (
        <AddItem
          title="Product"
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSaveProduct}
          categories={categories}
          onCancel={handleCancel}
        />
      ) : (
        <ListContainer
          title="Product"
          columns={columns}
          tableHead={tableHead}
          onClick={handleAddNewClick}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Products;
