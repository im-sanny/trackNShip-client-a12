import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Authentication/Login";
import Registration from "@/pages/Authentication/Registration";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import DashboardLayout from "@/layout/DashboardLayout";
import Common from "@/pages/Dashboard/Common/Common";
import BookParcel from "@/pages/Dashboard/User/BookParcel";
import MyParcel from "@/pages/Dashboard/User/MyParcel";
import MyProfile from "@/pages/Dashboard/User/MyProfile";
import UpdateBooking from "@/pages/Dashboard/DashPages/UpdateBooking";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <Common></Common>,
      },
      {
        path: "book-parcel",
        element: <BookParcel></BookParcel>,
      },
      {
        path: "my-parcel",
        element: <MyParcel></MyParcel>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "update-parcel/:id",
        element: <UpdateBooking></UpdateBooking>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/getUpdate/${params.id}`, ),
      },
      // admin
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default router;