import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Lottie from "lottie-react";
// import cycle from "@/assets/Cycle.json";

const Banner = () => {
  return (
    <>
      {/* <div className="">
        <Lottie animationData={cycle} className="h-[300px]"></Lottie>
      </div> */}
      <div
        className="relative bg-cover bg-center h-[500px] mt-10 rounded-lg"
        style={{
          backgroundImage: "url('https://i.ibb.co/yBp1H6G/mesh-833.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div className=" relative flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to TrackNShip</h1>
          <p className="text-xl mb-8">Discover amazing content below</p>
          <div className="flex  md:w-1/2 lg:w-1/3">
            <div className="flex w-full  items-center space-x-2">
              <Input type="text" placeholder="Search..." />
              <Button type="submit">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
