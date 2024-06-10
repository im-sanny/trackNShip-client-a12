import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex ">
      {/* Sidebar */}
      <Sidebar/>

      {/* Outlet --> Dynamic content */}
      {/* <div className=" md:ml-64"></div> */}
      <div className="flex-1 w-full ">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
