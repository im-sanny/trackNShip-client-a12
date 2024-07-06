import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import CountUp from "react-countup";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [totalParcelsBooked, setTotalParcelsBooked] = useState(0);
  const [totalParcelsDelivered, setTotalParcelsDelivered] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response1 = await axiosSecure?.get("/allParcel");
        const response2 = await axiosSecure?.get("/user");

        setTotalParcelsBooked(response1?.data?.length);

        const deliveredParcels = response1?.data?.filter(
          (parcel) => parcel?.status === "delivered"
        );
        setTotalParcelsDelivered(deliveredParcels?.length);

        setTotalUsers(response2?.data?.length);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [axiosSecure]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:mx-20 mb-8">
      <Card className="flex bg-green-300">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/zfynTjw/booking.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">
              <CountUp start={0} end={totalParcelsBooked} duration={5} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Parcel Booked
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="flex bg-pink-300">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/9NKJkT2/delivered.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">
              <CountUp start={0} end={totalParcelsDelivered} duration={5} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Parcel Delivered
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="flex bg-yellow-300">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/5TftP6G/teamwork.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">
              <CountUp start={0} end={totalUsers} duration={5} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Number of users
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
