import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Lottie from 'lottie-react';
import { Search, Package } from 'lucide-react';
import littleguy from '@/assets/littleguy.json';

const Banner = () => {
  return (
    <section className="my-10">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
            <Package
              className="mr-2 text-blue-600 dark:text-blue-400"
              size={20}
            />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Reliable Parcel Delivery
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-transparent bg-clip-text">
              TrackNShip
            </span>
            <span className="block text-gray-800 dark:text-white mt-2">
              Your Seamless Delivery Partner
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Experience lightning-fast, reliable parcel delivery with real-time
            tracking. We ensure your packages reach their destination safely and
            swiftly.
          </p>
          <div className="flex flex-col lg:mx-0 mx-8 sm:items-center sm:justify-center sm:flex-row lg:space-y-0 space-y-5 sm:space-x-4 lg:justify-start">
            <div className="flex items-center space-x-2 w-full lg:pr-10 md:pr-0">
              <Input type="text" placeholder="Track your parcel" />
              <Button type="submit" className="bg-violet-400">
                <Search className="mr-2" size={18} />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Lottie
            animationData={littleguy}
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
