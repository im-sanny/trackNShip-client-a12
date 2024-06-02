import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:'/login',
        element: <Login></Login>
      }
    ],
  },
]);

export default router;
