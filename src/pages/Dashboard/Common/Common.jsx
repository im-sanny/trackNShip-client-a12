import { Link } from "react-router-dom";

const Common = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center px-4 text-center py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Welcome to <span className="text-violet-600">TrackNShip</span> -
            Your Trusted Parcel Delivery Solution!
          </h1>
          <p className="px-4 md:px-8 mt-6 md:mt-8 mb-8 md:mb-12 text-base md:text-lg max-w-2xl">
            Fast, Reliable, and Secure Shipping at Your Fingertips. Track your
            parcels with ease and enjoy a seamless delivery experience!
          </p>
          <div className="inline-block outline outline-1 outline-violet-600 rounded-md overflow-hidden">
            <Link to="/">
              <button className="px-6 py-2 text-base md:text-lg font-semibold bg-violet-600 text-white hover:bg-violet-700 transition duration-300">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
