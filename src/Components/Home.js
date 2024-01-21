import React from "react";
import LOGO from "../Images/logo.png";

const Home = () => {
  return (
    <div className="shadow-lg w-full sm:w-10/12 mx-auto px-4 mt-6 sm:mt-12 flex flex-col items-center justify-center">
      <img className="w-40 h-40 sm:w-auto" src={LOGO} alt="logo" />
      <p className="text-2xl text-center mt-4 sm:mt-6">
        Welcome to Digitalflake Admin
      </p>
    </div>
  );
};

export default Home;
