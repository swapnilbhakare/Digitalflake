import React from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center  bg-[whitesmoke]  h-svh ">
      <div className="flex  flex-col justify-center items-center py-6 px-20 rounded-md shadow-md bg-white">
        <h2 className="text-purple-900 font-semibold">
          Did you forget your password?
        </h2>
        <p className="text-gray-700 font-medium">
          Enter your email address and we'll send you a link to restore password
        </p>
        <form>
          <div class="my-10 w-full">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="Email_Address"
            >
              Email Address
            </label>
            <input
              class="  appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email_Address"
              type="email"
              placeholder=""
            />
          </div>
          <div className="mt-8">
            <button className=" px-40 py-3 text-white rounded-md bg-purple-900 capitalize">
              Request reset link
            </button>
          </div>
        </form>
        <span
          onClick={handleBackToLogin}
          className="cursor-pointer mt-2 text-gray-600 underline"
        >
          Back to log in
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
