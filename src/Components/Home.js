import React from "react";
import LOGO from "../Images/logo.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:relative sm:left-96 sm:top-0">
      <img className="w-40 h-40 sm:w-auto" src={LOGO} alt="logo" />
      <p className="text-2xl text-center mt-4 sm:mt-0">
        Welcome to Digitalflake Admin
      </p>
    </div>
  );
};

export default Home;
