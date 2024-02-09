import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../Images/logo.png";
import backgroundImage from "../Images/bg.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../Store/authSlice";
import { API_URL } from "../utils/constants";

const Authentication = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      if (!enteredEmail || !enteredPassword) {
        toast.error("All fields are required");

        return;
      }

      const response = await axios.post(`${API_URL}/users/login`, {
        email: enteredEmail,
        password: enteredPassword,
      });

      const data = response?.data?.data;
      const user = data?.user;
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (response?.status === 200) {
        dispatch(
          login({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
        toast.success("User has successfully signed in");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Please check your Email id password");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        backgroundSize: "contain",
        backgroundColor: "whitesmoke",
      }}
      className="w-full h-full absolute bg-right bg-contain bg-no-repeat "
    >
      <div className={"bg-white  absolute left-4 lg:left-32 top-4 lg:top-16"}>
        <div className="w-full lg:w-[370px] h-full flex justify-center px-5 py-14 shadow-lg">
          <form className="w-full h-full" onSubmit={submitHandler}>
            <h2 className="flex items-center justify-center flex-col">
              <img src={LOGO} alt="logo" className="w-28" />
              <span className="text-gray-400 text-sm">
                Welcome to Digitalflake Admin
              </span>
            </h2>
            <div className="mt-8">
              <div className="relative">
                <input
                  type="email"
                  id="email_id"
                  className="rounded-sm block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[2px] border-gray-500 appearance-none dark:text-gray-400 dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500"
                  placeholder=" "
                  ref={emailInputRef}
                  required
                />
                <label
                  htmlFor="email_id"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-500 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Email ID
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  id="password"
                  className="rounded-sm block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[2px] border-gray-500 appearance-none dark:text-gray-400 dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500"
                  placeholder=" "
                  ref={passwordInputRef}
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-500 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Password
                </label>
              </div>

              <Link
                className="inline-block relative left-44 py-3"
                to="/reset-password"
              >
                Forgot Password?
              </Link>
              <div className="mt-8">
                <button className="px-32 py-3 text-white rounded-md bg-purple-900 capitalize">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
