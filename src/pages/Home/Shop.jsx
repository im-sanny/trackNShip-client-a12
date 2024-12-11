/* eslint-disable react/prop-types */
import {
  Store,
  Gift,
  ShoppingBag,
  Coffee,
  Shirt,
  PlayCircle,
} from 'lucide-react';

const PartnerIcon = ({ Icon, label }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
    <Icon
      className="w-12 h-12 text-blue-600 group-hover:text-blue-800 mb-2 transition-colors"
      strokeWidth={1.5}
    />
    <p className="text-sm text-gray-600 text-center">{label}</p>
  </div>
);

const Shop = () => {
  const PARTNER_ICONS = [
    { Icon: Store, label: 'Retro Brands' },
    { Icon: PlayCircle, label: 'PlayStation' },
    { Icon: Shirt, label: 'Kids Fashion' },
    { Icon: Gift, label: 'Online Gifts' },
    { Icon: ShoppingBag, label: 'Gift Emporium' },
    { Icon: Coffee, label: 'Starbucks' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNER_ICONS.map(({ Icon, label }, index) => (
            <PartnerIcon key={index} Icon={Icon} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
