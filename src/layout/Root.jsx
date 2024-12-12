import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <div className="bg-gradient-to-r from-green-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="mx-5 lg:mx-10">
          <Outlet></Outlet>
        </div>
      </div>
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default Root;
