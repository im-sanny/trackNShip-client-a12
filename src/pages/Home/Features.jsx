/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Define features data to make the component more maintainable
const FEATURES_DATA = [
  {
    id: 1,
    icon: 'https://i.ibb.co/p3QCH2V/order-tracking.png',
    title: 'Real-time Tracking',
    description:
      "Track your parcel in real-time from pickup to delivery, ensuring you're always informed about its status and estimated arrival time.",
  },
  {
    id: 2,
    icon: 'https://i.ibb.co/HBtb12J/protect.png',
    title: 'Secure Delivery',
    description:
      'Rest assured with our secure delivery system, providing end-to-end encryption and authentication to keep your parcels safe from tampering or theft.',
  },
  {
    id: 3,
    icon: 'https://i.ibb.co/Lz6NwFN/vecteezy-customer-service-people-3d-illustration-45686541.png',
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available 24/7 to assist you with any queries or concerns, providing reliable assistance whenever you need it.',
  },
  {
    id: 4,
    icon: 'https://i.ibb.co/BVjb7H6/learning.png',
    title: 'Online Management',
    description:
      'Access all the information you need in your personalized user dashboard, conveniently and efficiently.',
  },
  {
    id: 5,
    icon: 'https://i.ibb.co/tYYh4Kv/pick-up-truck.png',
    title: 'Daily Pickup, No Limits',
    description:
      'TrackNShip parcel service offers you the convenience of unlimited daily pickups without any restrictions.',
  },
  {
    id: 6,
    icon: 'https://i.ibb.co/4JYcRkq/money.png',
    title: 'Faster Payment Service',
    description:
      'We offer multiple payment methods including cash, bank transfers, and mobile banking for your convenience.',
  },
];

// Create a reusable FeatureCard component
const FeatureCard = ({ icon, title, description }) => (
  <Card className="rounded-3xl hover:shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700">
    <div className="pl-6 pt-6">
      <img src={icon} alt={title} className="h-24 w-24 object-contain" />
    </div>
    <CardHeader>
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <CardDescription className="">{description}</CardDescription>
    </CardHeader>
  </Card>
);

const Features = () => {
  return (
    <section className="container mx-auto px-4 py-5">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Features of TrackNShip</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the comprehensive features that make TrackNShip your ultimate
          parcel delivery solution.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES_DATA.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
