import React, { useRef } from "react";
import InputField from "./UI/InputField";

const CategoryForm = ({ formData, handleInputChange, categories }) => {
  const itemNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const statusInputRef = useRef();

  return (
    <div className="flex w-full justify-around px-6">
      <InputField
        id="item_name"
        label="Category Name"
        type="text"
        refProp={itemNameInputRef}
        value={formData.name}
        onChange={(value) => handleInputChange("name", value)}
        required
      />

      <InputField
        id="description"
        label="Description"
        type="text"
        refProp={descriptionInputRef}
        value={formData.description}
        onChange={(value) => handleInputChange("description", value)}
        required
      />

      <InputField
        id="status"
        label="Status"
        type="select"
        ref={statusInputRef}
        value={formData.status}
        onChange={(event) => handleInputChange("status", event)}
        options={{ active: "Active", inactive: "Inactive" }}
        required
      />
    </div>
  );
};

export default CategoryForm;
