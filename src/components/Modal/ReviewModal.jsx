/* eslint-disable react/prop-types */

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ReviewModal = ({ deliveryManID, photoURl, name }) => {
  const axiosSecure = useAxiosSecure();
  // const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const reviewData = {
        ...data,
        currentDate
      };
      console.log(reviewData);
      const response = await axiosSecure.post(`/reviews`, reviewData);
      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        toast.success("Review submit successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error sending review:", error.message);
      toast.error("Failed to send review. Please try again.");
    } finally {
      // setLoading(false);
    }
    // Close the modal
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-sm"
        onClick={() => setIsOpen(true)}
      >
        Review
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userName"
                    >
                      User Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="userName"
                      type="text"
                      value={name}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="photoURl"
                    >
                      User Image
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="photoURl"
                      type="url"
                      value={photoURl}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="deliveryManID"
                    >
                      Deliveryman ID
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="deliveryManID"
                      type="text"
                      value={deliveryManID}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="rating"
                    >
                      Rating (out of 5)
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      {...register("rating", {
                        required: true,
                        min: 1,
                        max: 5,
                      })}
                    />
                    {errors.rating && (
                      <span className="text-red-500 text-sm">
                        Rating is required and must be between 1 and 5.
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="feedback"
                    >
                      Feedback
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="feedback"
                      rows="4"
                      {...register("feedback", { required: true })}
                    ></textarea>
                    {errors.feedback && (
                      <span className="text-red-500 text-sm">
                        Feedback is required.
                      </span>
                    )}
                  </div>
                  <input
                    type="hidden"
                    {...register("deliveryManID")}
                    value={deliveryManID}
                  />
                  <input
                    type="hidden"
                    {...register("photoURl")}
                    value={photoURl}
                  />
                  <input type="hidden" {...register("name")} value={name} />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
