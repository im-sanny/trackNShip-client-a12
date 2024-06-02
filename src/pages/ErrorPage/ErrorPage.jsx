import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import error from "@/assets/error.json";
import { FaArrowLeft } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative flex items-center h-[100vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Lottie animationData={error} className="w-full h-full" />
        </div>
        <div className="absolute lg:bottom-16 bottom-56 left-0 right-0 mx-auto z-10 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-100 hover:bg-green-200 p-2 rounded-md flex items-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
          <Link
            to={"/"}
            className="bg-violet-200 hover:bg-violet-400 p-2 rounded-md flex items-center gap-2"
          >
            <FaHome /> Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
