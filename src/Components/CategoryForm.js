import React, { useRef } from "react";
import InputField from "./UI/InputField";

const CategoryForm = ({ formData, handleInputChange, categories }) => {
  const itemNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const statusInputRef = useRef();

  const { name, description, status } = formData;

  return (
    <div className="flex w-full justify-around px-6">
      <InputField
        id="item_name"
        label="Category Name"
        type="text"
        refProp={itemNameInputRef}
        value={name}
        onChange={(value) => handleInputChange("name", value)}
        required
      />

      <InputField
        id="description"
        label="Description"
        type="text"
        refProp={descriptionInputRef}
        value={description}
        onChange={(value) => handleInputChange("description", value)}
        required
      />

      <InputField
        id="status"
        label="Status"
        type="select"
        ref={statusInputRef}
        value={status}
        onChange={(event) => handleInputChange("status", event)}
        options={{ active: "Active", inactive: "Inactive" }}
        required
      />
    </div>
  );
};

export default CategoryForm;
