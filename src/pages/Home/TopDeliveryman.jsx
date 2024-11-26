import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const deliverymen = [
  {
    name: 'Johnson',
    parcels: 6,
    rating: 5,
    image: 'https://i.ibb.co/FhhZkbn/student-3.png',
  },
  {
    name: 'Owen',
    parcels: 3,
    rating: 5,
    image: 'https://i.ibb.co/30YTJVR/school.png',
  },
  {
    name: 'Tom',
    parcels: 3,
    rating: 4.9,
    image: 'https://i.ibb.co/9H2c0Cn/boy-1.png',
  },
  {
    name: 'James',
    parcels: 2,
    rating: 4.8,
    image: 'https://i.ibb.co/cJhWzqt/student-1.png',
  },
];

const TopDeliveryman = () => {
  return (
    <div className="container mx-auto px-4 mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Delivery Personnel
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliverymen
          .sort((a, b) => b.parcels - a.parcels || b.rating - a.rating)
          .map((person, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-2xl"
            >
              <div className="mb-4 w-24 h-24 flex items-center justify-center">
                <img
                  src={person.image}
                  alt={`${person.name}'s profile`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <CardHeader className="text-center w-full">
                <CardTitle className="text-xl font-semibold mb-2">
                  {person.name}
                </CardTitle>
                <CardDescription>
                  Parcels Delivered: {person.parcels}
                </CardDescription>
                <CardDescription>
                  Rating: {person.rating.toFixed(1)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TopDeliveryman;
