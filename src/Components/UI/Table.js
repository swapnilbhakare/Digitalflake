import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";

import Modal from "./Modal";
const Table = ({ data, columns, tableHead, onEdit, onDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Function to open delete modal and set delete item id
  const openDeleteModal = (_id) => {
    setDeleteItemId(_id);
    setDeleteModalOpen((prevState) => !prevState);
  };
  // Function to close delete modal and reset delete item id

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setDeleteModalOpen(false);
  };
  // Function to handle delete action

  const handleDelete = () => {
    console.log("Deleting item with ID:", deleteItemId);
    if (onDelete && deleteItemId) {
      onDelete(deleteItemId); // Calling onDelete function with delete item id
      closeDeleteModal();
    }
  };
  // Function to handle cancel action in delete modal

  const onCancel = () => {
    closeDeleteModal(); // Closing delete modal
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#FFF8B7] border">
          <tr>
            {tableHead.map((head) => (
              <th key={head.key} className="px-4 py-4">
                <span className="flex items-center justify-center">
                  {head.title}
                </span>
              </th>
            ))}
            <th className="px-4 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="bg-[whitesmoke] border border-spacing-y-96 my-4 text-center"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4">
                  {column.key === "category" ? (
                    <span>
                      {item.category && item.category.name
                        ? item.category.name
                        : item.name}
                    </span>
                  ) : column.type === "file" ? (
                    <img
                      src={item[column.key]}
                      alt={item.key}
                      className="h-14 w-14  object-contain "
                    />
                  ) : column.key === "status" ? (
                    <span
                      className={`${
                        item.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </span>
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
              <td className="px-4 py-4  " key="action ">
                {onEdit && (
                  <button
                    className="text-gray-700 mr-2"
                    onClick={() => onEdit(item._id)}
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                )}
                {onDelete && (
                  <>
                    <button
                      className={`text-gray-700 ${
                        item.status === "inactive"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        item.status === "active" && openDeleteModal(item._id)
                      }
                      disabled={item.status === "inactive"}
                    >
                      <FaTrashAlt className="inline-block mr-1" />
                    </button>

                    {deleteModalOpen && (
                      <Modal
                        onClose={closeDeleteModal}
                        position="fixed"
                        direction="top"
                      >
                        <div className="bg-white p-8 rounded-md">
                          <h6 className="flex items-center justify-center font-semibold text-3xl">
                            <RiAlertFill className="text-red-600 mr-3 " />{" "}
                            Delete
                          </h6>
                          <p className="text-gray-600 text-lg my-1">
                            {" "}
                            Are you sure you want to delete ?
                          </p>
                          <div className="flex justify-center mt-4">
                            <button
                              onClick={onCancel}
                              type="button"
                              className="border mr-2 border-gray-500 text-gray-500 py-2 px-10 rounded-3xl"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleDelete}
                              className="py-2 px-9 rounded-3xl bg-purple-800 text-white"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
