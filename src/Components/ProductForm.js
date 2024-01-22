import { useRef } from "react";
import InputField from "./UI/InputField";

const ProductForm = ({ formData, handleInputChange, categories }) => {
  const itemNameInputRef = useRef();
  const packSizeInputRef = useRef();
  const mrpInputRef = useRef();
  const categoryInputRef = useRef();
  const imageInputRef = useRef();
  const statusInputRef = useRef();
  const categoryOptions = categories.map((category) => ({
    _id: category._id,
    name: category.name,
  }));

  return (
    <div className="flex items-center justify-around flex-wrap w-full">
      <InputField
        id="category"
        label="Category"
        type="select"
        ref={categoryInputRef}
        value={formData.category}
        onChange={(event) => handleInputChange("category", event)}
        options={categoryOptions}
      />

      <InputField
        id="item_name"
        label="Product Name"
        type="text"
        ref={itemNameInputRef}
        value={formData.name}
        onChange={(value) => handleInputChange("name", value)}
      />

      <InputField
        id="pack_size"
        label="Pack Size"
        type="text"
        ref={packSizeInputRef}
        value={formData.packSize}
        onChange={(value) => handleInputChange("packSize", value)}
      />

      <InputField
        id="mrp"
        label="MRP"
        type="number"
        ref={mrpInputRef}
        value={formData.mrp}
        onChange={(event) => handleInputChange("mrp", event)}
      />

      <InputField
        id="productImage"
        label="Product Image"
        type="file"
        ref={imageInputRef}
        onChange={(event) => handleInputChange("productImage", event)}
      />

      <InputField
        id="status"
        label="Status"
        type="select"
        ref={statusInputRef}
        value={formData.status}
        onChange={(event) => handleInputChange("status", event)}
        options={{ active: "Active", inactive: "Inactive" }}
      />
    </div>
  );
};

export default ProductForm;
