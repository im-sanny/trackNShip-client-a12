import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import CountUp from 'react-countup';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [totalParcelsBooked, setTotalParcelsBooked] = useState(0);
  const [totalParcelsDelivered, setTotalParcelsDelivered] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response1 = await axiosSecure?.get('/allParcel');
        const response2 = await axiosSecure?.get('/user');

        setTotalParcelsBooked(response1?.data?.length);

        const deliveredParcels = response1?.data?.filter(
          (parcel) => parcel?.status === 'delivered'
        );
        setTotalParcelsDelivered(deliveredParcels?.length);

        setTotalUsers(response2?.data?.length);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [axiosSecure]);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5 lg:mx-20 mx-5 mb-10">
      <Card className="flex flex-col items-center p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 h-[270px] w-full lg:w-[270px] border-2 border-gray-300">
        <CardDescription className="flex items-center bg-green-100 p-4 shadow-md rounded-full border-4 border-r-violet-500">
          <img
            src="https://i.ibb.co/5TftP6G/teamwork.png"
            alt="Users"
            className="h-20"
          />
        </CardDescription>
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold">
            <CountUp start={0} end={totalUsers} duration={5} />
          </CardTitle>
          <CardContent>
            <div className="text-md font-semibold">Number of Users</div>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="flex flex-col items-center p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 h-[270px] w-full lg:w-[270px] border-2 border-gray-300">
        <CardDescription className="flex items-center bg-green-100 p-4 shadow-md rounded-full border-4 border-r-violet-500">
          <img
            src="https://i.ibb.co/9NKJkT2/delivered.png"
            alt="Delivered"
            className="h-20"
          />
        </CardDescription>
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold">
            <CountUp start={0} end={totalParcelsDelivered} duration={5} />
          </CardTitle>
          <CardContent>
            <div className="text-md font-semibold text-nowrap">
              Parcels Delivered
            </div>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="flex flex-col items-center p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 h-[270px] w-full lg:w-[270px] border-2 border-gray-300">
        <CardDescription className="flex items-center bg-green-100 p-4 shadow-md rounded-full border-4 border-r-violet-500">
          <img
            src="https://i.ibb.co/zfynTjw/booking.png"
            alt="Booked"
            className="h-20"
          />
        </CardDescription>
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold">
            <CountUp start={0} end={totalParcelsBooked} duration={5} />
          </CardTitle>
          <CardContent>
            <div className="text-md font-semibold">Parcels Booked</div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Statistics;
