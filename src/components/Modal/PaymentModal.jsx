/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const PaymentModal = ({ price, parcel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("confirm error", confirmError);
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      setIsPaid(true);
      toast.success("Payment successful");
      setIsOpen(false);
      const payment = {
        email: user.email,
        price,
        transactionId: paymentIntent.id,
        parcelId: Array.isArray(parcel)
          ? parcel.map((item) => item._id)
          : [parcel._id], // Updated to handle single parcel object
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res.data.acknowledged) {
          toast.success(`Payment saved with ID: ${res.data.insertedId}`);
        }
      } catch (error) {
        console.error("Error saving payment:", error);
        toast.error("Failed to save payment");
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {!isPaid ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-sm"
          onClick={() => setIsOpen(true)}
        >
          Pay
        </button>
      ) : (
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded btn-sm"
          disabled
        >
          Paid
        </button>
      )}

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block p-7 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <CardElement
                  className="p-4 rounded-md bg-lime-50"
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
                    disabled={!stripe || !clientSecret || isPaid}
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
                {transactionId && (
                  <p className="text-green-500">
                    Your transaction ID: {transactionId}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
