/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ParcelBookForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelWeight = watch("parcelWeight");

  const calculatePrice = (weight) => {
    const basePricePerKg = 50; // Base price per kilogram
    if (weight > 0) {
      return weight * basePricePerKg;
    }
    return 0; // Return 0 if weight is not valid
  };

  const today = new Date().toISOString().split("T")[0];

  const generateRandomCoordinate = () => {
    return (Math.random() * (180 - -180) + -180).toFixed(6);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const normalUser = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const currentDate = new Date().toLocaleDateString();
    try {
      const parcelData = {
        ...data,
        normalUser,
        status: "pending",
        price: calculatePrice(data.parcelWeight),
        currentDate,
        deliveryLat: generateRandomCoordinate(),
        deliveryLon: generateRandomCoordinate(),
      };
      console.log(parcelData);
      const response = await axiosSecure.post(`/bookParcel`, parcelData);
      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        toast.success("Parcel booked successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error booking parcel:", error.message);
      toast.error("Failed to book parcel. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className=" mx-auto ">
        <h1 className="text-center font-bold text-3xl mb-4 bg-gray-100 py-2 px-0 w-full ">
          Book a Parcel
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 container"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder=""
              id="name"
              required
              value={user?.displayName}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder=""
              id="email"
              required
              value={user?.email}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              placeholder="phone number"
              id="phoneNumber"
              required
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <Label htmlFor="parcelType">Parcel Type</Label>
            <Input
              placeholder="parcel type"
              id="parcelType"
              required
              {...register("parcelType")}
            />
          </div>
          <div>
            <Label htmlFor="parcelWeight">Parcel Weight (kg)</Label>
            <Input
              placeholder="parcel weight"
              id="parcelWeight"
              type="number"
              required
              {...register("parcelWeight")}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              placeholder="price"
              id="price"
              required
              value={calculatePrice(parcelWeight)}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="receiverName">Receiver’s Name</Label>
            <Input
              placeholder="receivers name"
              id="receiverName"
              required
              {...register("receiverName")}
            />
          </div>
          <div>
            <Label htmlFor="receiverPhoneNumber">Receiver's Phone Number</Label>
            <Input
              placeholder="receivers phone number"
              id="receiverPhoneNumber"
              required
              {...register("receiverPhoneNumber")}
            />
          </div>
          <div>
            <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
            <Input
              placeholder="parcel delivery address"
              id="deliveryAddress"
              required
              {...register("deliveryAddress")}
            />
          </div>
          <div>
            <Label htmlFor="requestedDeliveryDate">
              Requested Delivery Date
            </Label>
            <Input
              type="date"
              id="requestedDeliveryDate"
              name="requestedDeliveryDate"
              min={today}
              required
              {...register("requestedDeliveryDate")}
            />
          </div>
          <div>
            <Label htmlFor="deliveryLat">Delivery Address Latitude</Label>
            <Input
              placeholder="latitude"
              id="deliveryLat"
              type="number"
              required
              {...register("deliveryLat")}
            />
          </div>
          <div>
            <Label htmlFor="deliveryLon">Delivery Address Longitude</Label>
            <Input
              placeholder="longitude"
              id="deliveryLon"
              required
              type="number"
              {...register("deliveryLon")}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center"
          >
            {loading ? "Booking..." : "Book"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ParcelBookForm;
