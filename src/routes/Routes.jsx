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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "@/pages/Dashboard/Admin/Statistics";
import AllParcel from "@/pages/Dashboard/Admin/AllParcel";
import AllDeliveryman from "@/pages/Dashboard/Admin/AllDeliveryman";
import DeliverymanRoute from "./DeliverymanRoute";
import MyDeliveryList from "@/pages/Dashboard/Deliveryman/MyDeliveryList";

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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            {/* <Common></Common> */}
          </PrivateRoute>
        ),
      },
      {
        path: "book-parcel",
        element: (
          <PrivateRoute>
            <BookParcel></BookParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcel",
        element: (
          <PrivateRoute>
            <MyParcel></MyParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "update-parcel/:id",
        element: (
          <PrivateRoute>
            <UpdateBooking></UpdateBooking>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/getUpdate/${params.id}`),
      },
      // admin
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics></Statistics>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-parcel",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllParcel></AllParcel>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-deliveryman",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDeliveryman></AllDeliveryman>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // deliveryman
      {
        path: "my-delivery-list",
        element: (
          <PrivateRoute>
            <DeliverymanRoute>
              <MyDeliveryList></MyDeliveryList>
            </DeliverymanRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
