import Authentication from "./Pages/Authentication";
import AdminDashboard from "./Pages/AdminDashboard";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import FontLoader from "./utils/FontLoader";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
