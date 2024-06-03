import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      {/* sidebar */}
      <div className="relative min-h-screen md:flex">
        <Sidebar></Sidebar>
      </div>
      {/* outlet ----> Dynamic content */}
      <div className="flex md:ml-64">
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
