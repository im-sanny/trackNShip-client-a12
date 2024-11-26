import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Lottie from 'lottie-react';
import littleguy from '@/assets/littleguy.json';

const Banner = () => {
  return (
    <section className="">
      <div className="container flex flex-col justify-center mx-auto lg:flex-row lg:justify-between rounded-3xl mb-10">
        <div className="lg:w-3/6 lg:h-[400px] py-5 flex flex-col justify-center text-center rounded-sm lg:text-left md:text-left">
          <h1 className="text-3xl lg:mx-0 mx-3 font-bold leading-none sm:text-6xl bg-gradient-to-r from-green-300 via-pink-300 to-yellow-300 text-transparent bg-clip-text animate-gradient">
            TrackNShip: Your Reliable Partner in Seamless Parcel Delivery
          </h1>
          <p className="mt-3 mb-3 text-lg text-muted-foreground">
            TrackNShip offers fast, reliable parcel delivery with real-time
            tracking for your peace of mind.
          </p>
          <div className="flex flex-col lg:mx-0 mx-8 sm:items-center sm:justify-center sm:flex-row lg:space-y-0 space-y-5 sm:space-x-4 lg:justify-start">
            <div className="flex   items-center space-x-2 w-full lg:pr-10 md:pr-0">
              <Input type="text" placeholder="Search..." />
              <Button type="submit" className="bg-violet-400">
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center lg:w-3/6 -mt-8 -top-8">
          <Lottie
            animationData={littleguy}
            className="object-cover h-[405px] w-[800px] rounded-md p-5"
          ></Lottie>
        </div>
      </div>
    </section>
  );
};

export default Banner;
