import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "@/pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
