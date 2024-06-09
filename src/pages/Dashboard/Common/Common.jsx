import { Link } from "react-router-dom";

const Common = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Welcome to TrackNShip - Your Trusted Parcel Delivery Solution!
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          Fast, Reliable, and Secure Shipping at Your Fingertips. Track your
          parcels with ease and enjoy a seamless delivery experience!
        </p>
        <div className="flex -mt-2 outline rounded-md flex-wrap justify-center">
          <button className="px-5 py-1 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
            <Link to={'/'}>Home</Link>
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default Common;
