import Authentication from "./Pages/Authentication";
import AdminDashboard from "./Pages/AdminDashboard";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import FontLoader from "./utils/FontLoader";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { login } from "./Store/authSlice";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const isAuthenticated = auth.isAuthenticated;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (accessToken && refreshToken) {
      // Dispatch login action with stored tokens
      dispatch(login({ accessToken, refreshToken, user }));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" />
      <FontLoader />
      <Routes>
        <Route path="/" element={<Authentication />} />
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Authentication />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
