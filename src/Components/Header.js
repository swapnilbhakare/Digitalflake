import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Modal from "./UI/Modal";
import { RiAlertFill } from "react-icons/ri";
import { HeaderLogo } from "../utils/headerLogo";
import { logout } from "../Store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../utils/constants";

const Logout = ({ handleLogoutModalClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/logout`);
      if (response.status === 200) {
        dispatch(logout());
        toast.success("User has successfully logged out");
        handleLogoutModalClose();

        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.success("User has successfully logged out", error);
    }

    dispatch(logout());
    handleLogoutModalClose();
    navigate("/");
  };
  const onCancel = () => {
    handleLogoutModalClose();
  };
  return (
    <div className="flex flex-col items-center  ">
      <h6 className="flex items-center justify-between text-2xl font-semibold">
        <RiAlertFill className="text-red-700 mr-2" /> <span>Log Out</span>
      </h6>
      <span className="text-slate-600 my-2">
        Are you sure you want to log out?
      </span>
      <div className="mt-4">
        <button
          onClick={onCancel}
          type="button"
          className="border mr-2 border-gray-500 text-gray-500 py-2 px-10 rounded-3xl"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="py-2 px-9 rounded-3xl bg-purple-800 text-white"
        >
          Confirm
        </button>
        ;
      </div>
    </div>
  );
};

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogoutModalOpen = () => {
    setLogoutModalOpen(true);
    handleCloseModal();
  };

  const handleLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-10 w-full h-14 bg-purple-900">
      <div>{HeaderLogo}</div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <img
            className="w-8 h-8 rounded-full object-contain bg-white"
            src={user.user.data.user.profileImage}
            alt={user.user.data.user.fullName}
            onClick={() => handleProfileClick()}
          />
        ) : (
          <CgProfile
            className="text-white text-3xl cursor-pointer mr-4"
            onClick={() => handleProfileClick()}
          />
        )}

        {isModalOpen && (
          <Modal
            onClose={handleCloseModal}
            backdropOpacity={0.2}
            position="absolute top-12 right-0 "
          >
            <div className="p-4 ">
              <button
                onClick={handleLogoutModalOpen}
                className="text-red-600 px-6 py-2  bg-white border-red-600 rounded-md cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </Modal>
        )}
        {isLogoutModalOpen && (
          <Modal
            position={`right-2 rounded-lg top-40 shadow-lg z-50 py-12 px-6 bg-white`}
          >
            <Logout handleLogoutModalClose={handleLogoutModalClose} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;
