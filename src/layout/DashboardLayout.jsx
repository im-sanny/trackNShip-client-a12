import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex ">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      {/* <div className=" md:ml-64"></div> */}
      <div className="flex-1 w-full bg-gradient-to-r from-green-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
