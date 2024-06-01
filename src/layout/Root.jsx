import Footer from "@/components/shared/Footer/Footer";
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
      <Footer></Footer>
    </div>
  );
};

export default Root;
