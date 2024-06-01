const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-8 dark:bg-gray-100 dark:text-gray-600">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-600">
              <img
                src="https://i.ibb.co/dLWh1Vh/tagged.png"
                alt=""
                className="h-12"
              />
            </div>
            <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Use
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer" href="#">
                Instagram
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">
                Facebook
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
