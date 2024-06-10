/* eslint-disable react/prop-types */
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Confetti from "react-confetti";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const navigate = useNavigate();
  const { price, _id } = useLoaderData();
  const [clientSecret, setClientSecret] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosSecure.post("/create-payment-intent", {
          price,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [axiosSecure, price]);

  const handleSubmit = async (event, stripe, elements) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (error) {
      console.error("[error]", error);
      toast.error(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setIsPaid(true);
      setShowConfetti(true);
      toast.success("Payment successful");

      // Update payment status in the database
      try {
        const response = await axiosSecure.patch(`/getUpdateStatus/${_id}`, {
          paymentIntentId: paymentIntent.id,
          price: "paid", // Update status as per your backend logic
        });

        if (response.status === 200) {
          console.log("Payment status updated in the database");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
      }

      setTimeout(() => {
        setShowConfetti(false);
        navigate("/dashboard/my-parcel");
      }, 5000); // Redirect to MyParcel page after 5 seconds
    }
  };

  const handleCancel = () => {
    setIsPaid(false);
  };

  return (
    <div className='grid items-center my-auto'>
      {showConfetti && <Confetti />}
      <div className="text-center font-semibold my-3">Payment Please pay to place order!</div>
      <div>
        {!isPaid ? (
          <div>
            <Elements stripe={stripePromise}>
              <InjectedForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            </Elements>
          </div>
        ) : (
          <div className="text-center">Payment Successful!</div>
        )}
      </div>
    </div>
  );
};

const InjectedForm = ({ handleSubmit, handleCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className=" mx-auto">
      <form onSubmit={(event) => handleSubmit(event, stripe, elements)}>
        <CardElement
          className="p-4 rounded-md bg-lime-50 mx-auto w-[400px]"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-sm mt-5 mr-3"
          >
            Pay
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded btn-sm mt-5"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
