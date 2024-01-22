import React, { useState, useEffect, useMemo } from "react";
import { API_URL } from "../utils/constants";
import { toast } from "react-toastify";
import AddItem from "./AddItem";
import ListContainer from "./UI/ListContainer";
import axios from "axios";
import {
  setProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    packSize: "",
    category: "",
    mrp: "",
    productImage: "",
    status: "",
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/fetch-products`,
          config
        );

        dispatch(setProducts(response?.data?.data));
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Error fetching products");
      }
    };
    fetchProducts();
  }, [dispatch, config]);

  const handleSaveProduct = async () => {
    if (
      (!editProductId && !formData.productImage) ||
      !formData.name ||
      !formData.packSize ||
      !formData.category ||
      !formData.mrp ||
      !formData.status
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("_id", formData._id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("packSize", formData.packSize);

      formDataToSend.append("mrp", formData.mrp);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("category", JSON.stringify(formData.category));

      if (formData.productImage instanceof File) {
        formDataToSend.append("productImage", formData.productImage);
      }

      if (editProductId) {
        await axios.put(
          `${API_URL}/products/update-product/${editProductId}`,
          formDataToSend,
          config
        );

        dispatch(editProduct({ _id: editProductId, updatedData: formData }));
        toast.success("Product updated successfully");
        setEditProductId(null);
      } else {
        const response = await axios.post(
          `${API_URL}/products/add-product`,
          formDataToSend,
          config
        );

        dispatch(addProduct(response.data.data));
        toast.success("Product added successfully");
      }

      setShowAddProduct(false);
      setFormData({
        name: "",
        packSize: "",
        category: "",
        mrp: "",
        productImage: "",
        status: "",
      });
    } catch (error) {
      console.error("Error saving/updating product:", error.message);
      toast.error("Error saving/updating product");
    }
  };

  const handleAddNewClick = () => {
    setShowAddProduct(true);
    setEditProductId(null);
  };

  const handleEdit = (_id) => {
    const productToEdit = products.find((product) => product._id === _id);

    if (productToEdit) {
      setShowAddProduct(true);
      setEditProductId(_id);
      setFormData(productToEdit);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${API_URL}/products/delete-product/${_id}`, config);

      dispatch(deleteProduct(_id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
      toast.error("Error deleting category");
    }
  };

  const handleInputChange = (field, eventOrValue) => {
    const value =
      eventOrValue.target !== undefined
        ? eventOrValue.target.value
        : eventOrValue;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setShowAddProduct(false);
    setFormData({
      name: "",
      packSize: "",
      category: "",
      mrp: "",
      productImage: "",
      status: "",
    });
  };

  const columns = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "packSize", title: "Pack Size" },
    {
      key: "category",
      title: "Category",
      type: "select",
      options: ["milk", "bread", "others"],
    },
    { key: "mrp", title: "MRP", type: "number" },
    { key: "productImage", title: "Image", type: "file" },
    {
      key: "status",
      title: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const tableHead = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "packSize", title: "Pack Size" },
    {
      key: "category",
      title: "Category",
      type: "select",
      options: Array.isArray(categories)
        ? categories.map((category) => category.name)
        : [],
    },
    { key: "mrp", title: "MRP", type: "number" },
    { key: "productImage", title: "Image", type: "file" },
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
