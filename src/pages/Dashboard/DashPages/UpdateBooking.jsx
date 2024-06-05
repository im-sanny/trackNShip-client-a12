import { useLoaderData, useNavigate } from "react-router-dom";
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Input } from "@/components/ui/input";

const UpdateBooking = () => {
  const {
    phoneNumber,
    price,
    // status,
    deliveryLon,
    deliveryLat,
    requestedDeliveryDate,
    deliveryAddress,
    receiverPhoneNumber,
    receiverName,
    parcelWeight,
    parcelType,
    _id,
  } = useLoaderData();
  //   console.log(parcel);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const bookingParcelWeight = watch("parcelWeight");

  const calculatePrice = (weight) => {
    const basePricePerKg = 50; // Base price per kilogram
    if (weight > 0) {
      return weight * basePricePerKg;
    }
    return 0; // Return 0 if weight is not valid
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
        // name: user.displayName,
        // email: user.email,
        status: "pending",
        price: calculatePrice(data.parcelWeight),
        currentDate,
      };
      console.log(parcelData);
      const response = await axiosSecure.patch(`/getUpdate/${_id}`, parcelData);
      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        toast.success("Parcel updated successfully!");
        reset();
        navigate("/dashboard/my-parcel");
      }
    } catch (error) {
      console.error("Error booking parcel:", error.message);
      toast.error("Failed to book parcel. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center bg-green-200 p-2 px-0 w-full">
        Update Parcel
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
            defaultValue={phoneNumber}
            placeholder="phoneumber"
            id="phoneNumber"
            required
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <Label htmlFor="parcelType">Parcel Type</Label>
          <Input
            defaultValue={parcelType}
            placeholder="parcel type"
            id="parcelType"
            required
            {...register("parcelType")}
          />
        </div>
        <div>
          <Label htmlFor="parcelWeight">Parcel Weight (kg)</Label>
          <Input
            defaultValue={parcelWeight}
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
            defaultValue={price}
            placeholder="price"
            id="price"
            required
            value={calculatePrice(bookingParcelWeight)}
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="receiverName">Receiver’s Name</Label>
          <Input
            defaultValue={receiverName}
            placeholder="receivers name"
            id="receiverName"
            required
            {...register("receiverName")}
          />
        </div>
        <div>
          <Label htmlFor="receiverPhoneNumber">Receiver's Phone Number</Label>
          <Input
            defaultValue={receiverPhoneNumber}
            placeholder="receivers phone number"
            id="receiverPhoneNumber"
            required
            {...register("receiverPhoneNumber")}
          />
        </div>
        <div>
          <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
          <Input
            defaultValue={deliveryAddress}
            placeholder="parcel delivery address"
            id="deliveryAddress"
            required
            {...register("deliveryAddress")}
          />
        </div>
        <div>
          <Label htmlFor="requestedDeliveryDate">Requested Delivery Date</Label>
          <Input
            defaultValue={requestedDeliveryDate}
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
            defaultValue={deliveryLat}
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
            defaultValue={deliveryLon}
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
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateBooking;
