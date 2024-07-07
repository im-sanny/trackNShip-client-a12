/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-10 mb-10">
      <header className="text-4xl flex justify-center mt-10 font-semibold">
        {" "}
        Features of TrackNShip
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/p3QCH2V/order-tracking.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>Real-time Tracking</CardTitle>
            <CardDescription>
              {" "}
              Track your parcel in real-time from pickup to delivery, ensuring
              you're always informed about its status and estimated arrival
              time.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/HBtb12J/protect.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>Secure Delivery</CardTitle>
            <CardDescription>
              Rest assured with our secure delivery system, providing end-to-end
              encryption and authentication to keep your parcels safe from
              tampering or theft.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/Lz6NwFN/vecteezy-customer-service-people-3d-illustration-45686541.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>24/7 Customer Support</CardTitle>
            <CardDescription>
              Our dedicated support team is available 24/7 to assist you with
              any queries or concerns, providing reliable assistance whenever
              you need it.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/BVjb7H6/learning.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>Online Management</CardTitle>
            <CardDescription>
              Access all the information you need in your personalized user
              dashboard, conveniently and efficiently.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/tYYh4Kv/pick-up-truck.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>Daily Pickup, No Limits</CardTitle>
            <CardDescription>
              TrackNShip parcel service offers you the convenience of unlimited
              daily pickups without any restrictions.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg--50 rounded-3xl">
          <div className="pl-6 pt-6">
            <img
              src="https://i.ibb.co/4JYcRkq/money.png"
              alt=""
              className="h-24"
            />
          </div>
          <CardHeader>
            <CardTitle>Faster Payment Service</CardTitle>
            <CardDescription>
              We offer multiple payment methods including cash, bank transfers,
              and mobile banking for your convenience.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Features;
