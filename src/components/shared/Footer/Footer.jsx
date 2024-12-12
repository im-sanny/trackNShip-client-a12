import { Facebook, Twitter, Github, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-100/50 dark:bg-gray-800/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co/dLWh1Vh/tagged.png"
                alt="TrackNShip Logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                TrackNShip
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
              Empowering logistics with cutting-edge tracking solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {['Home', 'Who We Are', 'Our Philosophy'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Industries
              </h3>
              <ul className="space-y-2">
                {[
                  'Retail & E-Commerce',
                  'Information Technology',
                  'Finance & Insurance',
                ].map((industry) => (
                  <li key={industry}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                    >
                      {industry}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Stay Updated
            </h3>
            <div className="flex items-center border dark:border-gray-700 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 dark:bg-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 text-white p-2 hover:bg-blue-700 transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Github, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 TrackNShip. Crafted with ❤️ by Sanny
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
