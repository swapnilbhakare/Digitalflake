import React from "react";
import { CiSearch } from "react-icons/ci";
import Table from "./Table";
import { BsBox2 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";

const ListContainer = ({
  title,
  data,
  columns,
  tableHead,
  onClick,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="shadow-lg flex flex-col w-full sm:w-10/12 px-4 ml-1 mt-6 sm:ml-0">
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-6">
        <h2 className="flex items-center text-xl mb-4 sm:mb-0">
          {title === "Category" ? (
            <BiCategory className="mr-2" />
          ) : (
            <BsBox2 className="mr-2" />
          )}
          {title}
        </h2>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <form className="w-full sm:w-auto">
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CiSearch className="text-lg" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full sm:w-48 py-1 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search..."
                required
              />
            </div>
          </form>
          <button
            onClick={onClick}
            className="bg-purple-900 text-white px-3 py-2 rounded-md"
          >
            Add New
          </button>
        </div>
      </div>
      <Table
        data={data}
        columns={columns}
        tableHead={tableHead}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ListContainer;
