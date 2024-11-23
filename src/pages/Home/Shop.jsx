/* eslint-disable react/prop-types */

const LOGOS = [
  {
    id: 1,
    src: 'https://i.ibb.co/Wy5BBp3/Premade-Retro-70s-Style-Logo-Design-Seventies-Logo-Vintage-Etsy.jpg',
    alt: 'Retro 70s Style Logo',
  },
  {
    id: 2,
    src: 'https://i.ibb.co/WxvfVRS/Play-Station-Store-logo-vector-svg-pdf-formats-free-download-Brandlogos-net.jpg',
    alt: 'PlayStation Store Logo',
  },
  {
    id: 3,
    src: 'https://i.ibb.co/sjV5HgN/Kids-store-clothing-hanging-from-branch-logo-vector-image-on-Vector-Stock.jpg',
    alt: 'Kids Store Logo',
  },
  {
    id: 4,
    src: 'https://i.ibb.co/gSp138k/The-Gifts-Online-Promotional-Products-Store-Logo-Design.jpg',
    alt: 'Gifts Online Logo',
  },
  {
    id: 5,
    src: 'https://i.ibb.co/M8Nffc0/Bird-Gift-Premade-Logo-Design-Customized-with-Your-Business-Name-Ramble-Road-Studios.jpg',
    alt: 'Bird Gift Logo',
  },
  {
    id: 6,
    src: 'https://i.ibb.co/J7DfVkn/Buy-Starbucks-Branded-Logo-Svg-Png-online-in-USA.jpg',
    alt: 'Starbucks Logo',
  },
];

// Create a reusable LogoItem component
const LogoItem = ({ src, alt }) => (
  <div className="flex items-center justify-center p-4 transition-transform transform hover:scale-105 w-full">
    <img src={src} alt={alt} className="rounded-3xl object-contain shadow" />
  </div>
);

const Shop = () => {
  return (
    <div className="lg:my-10">
      <h2 className="text-center text-4xl font-semibold mb-6">Our Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-auto max-w-screen-lg">
        {LOGOS.map((logo) => (
          <LogoItem key={logo.id} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
