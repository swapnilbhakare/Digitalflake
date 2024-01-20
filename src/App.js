import { createBrowserRouter, Outlet } from "react-router-dom";
import Error from "./Components/Error";
import Authentication from "./Pages/Authentication";
import AdminDashboard from "./Pages/AdminDashboard";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import FontLoader from "./utils/FontLoader";
function App() {
  return (
    <>
      <ToastContainer />
      <FontLoader />
      <Outlet />
      <ToastContainer position="top-right" />
    </>
  );
}
export default App;

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Authentication />,
      },
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);
