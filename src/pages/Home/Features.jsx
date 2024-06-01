/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Features = () => {
  return (
    <>
    <header className="text-4xl flex justify-center mt-10 font-semibold"> Our Features</header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 lg:mx-10 my-10">
      <Card>
        <div className="pl-6 pt-6">
          <img
            src="https://i.ibb.co/M23V1pm/vecteezy-location-3d-icon-illustration-28249606.png"
            alt=""
            className="h-24"
          />
        </div>
        <CardHeader>
          <CardTitle>Real-time Tracking</CardTitle>
          <CardDescription>
            {" "}
            Track your parcel in real-time from pickup to delivery, ensuring
            you're always informed about its status and estimated arrival time.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <div className="pl-6 pt-6">
          <img
            src="https://i.ibb.co/hHPP7nR/vecteezy-3d-element-delivery-icons-render-25350261.png"
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
      <Card>
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
            Our dedicated support team is available 24/7 to assist you with any
            queries or concerns, providing reliable assistance whenever you need
            it.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
    </>
  );
};

export default Features;
