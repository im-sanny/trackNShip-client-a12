/* eslint-disable react/no-unescaped-entities */
const Faq = () => {
  return (
    <section className="dark:text-gray-500">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">
          How it works
        </p>
        <h2 className="mb-12 text-2xl font-bold leading-none text-center sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
          <details>
            <summary className="py-2 outline-none cursor-pointer">
              How do I book a parcel for delivery on TrackNShip?
            </summary>
            <div className="px-4 pb-4">
              <p>
                To book a parcel, log in to your user account and navigate to
                the "Book Parcel" section. Fill in the necessary details,
                including the parcel weight, receiver's information, and
                delivery address. Once completed, submit the booking and you'll
                receive a confirmation.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer">
              What should I do if I forget my password?
            </summary>
            <div className="px-4 pb-4">
              <p>
                If you forget your password, click on the "Forgot Password" link
                on the login page. Enter your registered email address, and
                you'll receive an email with instructions to reset your
                password.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer">
              How can I track the status of my parcel?
            </summary>
            <div className="px-4 pb-4">
              <p>
                You can track the status of your parcel by logging in to your
                user dashboard. Navigate to the "My Parcels" section, where
                you'll find real-time updates on the status of your booked
                parcels.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer">
              How do I contact customer support for issues with my delivery?
            </summary>
            <div className="px-4 pb-4">
              <p>
                For any issues with your delivery, you can contact customer
                support through the "Help" or "Contact Us" section on the
                TrackNShip platform. Provide your parcel details and issue, and
                our support team will assist you promptly.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer">
              Is my payment information secure on TrackNShip?
            </summary>
            <div className="px-4 pb-4">
              <p>
                Yes, your payment information is secure on TrackNShip. We use
                Stripe for secure payment processing, and all sensitive data is
                encrypted and managed with industry-standard security practices.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Faq;
