/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden transition-all duration-300 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left
        hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <HelpCircle className="text-blue-500 dark:text-blue-400" size={24} />
          <span className="font-medium text-gray-800 dark:text-white">
            {question}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-500 dark:text-gray-300" />
        ) : (
          <ChevronDown className="text-gray-500 dark:text-gray-300" />
        )}
      </button>

      {isOpen && (
        <div
          className="px-4 pt-2 pb-4 bg-gray-50 dark:bg-gray-900
          text-gray-600 dark:text-gray-300 transition-all duration-300"
        >
          <p className="pl-11">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: 'How do I book a parcel for delivery on TrackNShip?',
      answer:
        "To book a parcel, log in to your user account and navigate to the 'Book Parcel' section. Fill in the necessary details, including the parcel weight, receiver's information, and delivery address. Once completed, submit the booking and you'll receive a confirmation.",
    },
    {
      question: 'What should I do if I forget my password?',
      answer:
        "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and you'll receive an email with instructions to reset your password.",
    },
    {
      question: 'How can I track the status of my parcel?',
      answer:
        "You can track the status of your parcel by logging in to your user dashboard. Navigate to the 'My Parcels' section, where you'll find real-time updates on the status of your booked parcels.",
    },
    {
      question:
        'How do I contact customer support for issues with my delivery?',
      answer:
        "For any issues with your delivery, you can contact customer support through the 'Help' or 'Contact Us' section on the TrackNShip platform. Provide your parcel details and issue, and our support team will assist you promptly.",
    },
    {
      question: 'Is my payment information secure on TrackNShip?',
      answer:
        'Yes, your payment information is secure on TrackNShip. We use Stripe for secure payment processing, and all sensitive data is encrypted and managed with industry-standard security practices.',
    },
  ];

  return (
    <section className="mb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-block bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-4">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
              How It Works
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Got questions? We&apos;ve got answers. Here are some of the most
            common inquiries about our parcel delivery service.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
