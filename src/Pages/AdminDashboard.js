import React, { useState } from "react";

import Header from "../Components/Header";

import Home from "../Components/Home";
import Category from "../Components/Category";
import Products from "../Components/Products";
import DashboardSideNav from "../Components/DashboardSideNav";

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("home");

  return (
    <div>
      <Header />
      <div className="flex">
        <DashboardSideNav
          setSelectedComponent={setSelectedComponent}
          selectedComponent={selectedComponent}
        />
        {selectedComponent === "home" ? (
          <Home />
        ) : selectedComponent === "category" ? (
          <Category />
        ) : selectedComponent === "products" ? (
          <Products />
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
