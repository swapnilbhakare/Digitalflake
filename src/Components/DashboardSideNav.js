import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineArrowRight } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { LuBox } from "react-icons/lu";
const DashboardSideNav = ({ setSelectedComponent }) => {
  return (
    <div
      className=" h-screen bg-slate-200 w-1/5 shadow-lg"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <ul className="mt-8 flex flex-col px-4 text-2xl ">
        <li
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setSelectedComponent("home")}
        >
          <span className="inline-flex items-center">
            <FaHome /> <span className="ml-3">Home</span>
          </span>
          <MdOutlineArrowRight />
        </li>
        <li
          className="flex items-center justify-between my-8 cursor-pointer"
          onClick={() => setSelectedComponent("category")}
        >
          <span className="inline-flex items-center">
            <TbCategory /> <span className="ml-3">Category</span>
          </span>
          <MdOutlineArrowRight />
        </li>
        <li
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setSelectedComponent("products")}
        >
          <span className="inline-flex items-center">
            <LuBox /> <span className="ml-3">Products</span>
          </span>
          <MdOutlineArrowRight />
        </li>
      </ul>
    </div>
  );
};

export default DashboardSideNav;
