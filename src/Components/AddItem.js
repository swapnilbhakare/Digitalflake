import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";

const AddItem = ({
  title,
  formData,
  handleInputChange,
  handleSubmit,
  categories,
  onCancel,
  isEdit,
}) => {
  return (
    <div className="shadow-lg flex flex-col w-full ml-2 mt-6">
      <form onSubmit={handleSubmit}>
        <div>
          <h6 className="flex text-xl items-center  px-2">
            <IoArrowBackOutline
              className="mr-2 cursor-pointer"
              onClick={onCancel}
            />
            <span>Add {title}</span>
          </h6>
        </div>
        <div className="mt-10 flex justify-around items-center w-full space-x-4 flex-wrap">
          {title === "Category" ? (
            <CategoryForm
              formData={formData}
              handleInputChange={handleInputChange}
              categories={categories}
            />
          ) : (
            <ProductForm
              formData={formData}
              handleInputChange={handleInputChange}
              categories={categories}
            />
          )}
        </div>
        <div className="absolute bottom-0 right-0 flex items-center py-2 px-4">
          <button
            onClick={onCancel}
            type="button"
            className="border mr-2 border-gray-500 text-gray-500 py-2 px-10 rounded-3xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleSubmit(!isEdit);
            }}
            className="py-2 px-10 rounded-3xl bg-purple-800 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
