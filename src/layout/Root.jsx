import Navbar from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const Root = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <Outlet></Outlet>
      {/* footer */}
      <h1>footer</h1>
    </div>
  );
};

export default Root;
