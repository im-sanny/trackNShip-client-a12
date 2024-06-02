import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Authentication/Login";
import Registration from "@/pages/Authentication/Registration";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'registration',
        element:<Registration></Registration>
      },
    ],
  },
]);

export default router;
