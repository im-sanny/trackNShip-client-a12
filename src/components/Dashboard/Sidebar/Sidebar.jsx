/* eslint-disable react/no-unknown-property */
import { Bell, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import toast from "react-hot-toast";
import DeliverymanNav from "./Navs/DeliverymanNav";
import UserNav from "./Navs/UserNav";
import AdminNav from "./Navs/AdminNav";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  // console.log(role, isLoading);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("LogOut successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {role === "user" && <UserNav></UserNav>}
        {role === "deliveryman" && <DeliverymanNav></DeliverymanNav>}
        {role === "admin" && <AdminNav></AdminNav>}
      </nav>
    </>
  );
  return (
    <>
      <div className="grid lg:min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-r border-gray-100 dark:border-gray-800 h-full flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to={"/"} className="flex items-center gap-2 font-semibold">
                <div className="font-bold flex items-center gap-1">
                  <img
                    src="https://i.ibb.co/dLWh1Vh/tagged.png"
                    alt=""
                    className="h-8"
                  />
                  TrackNShip
                </div>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">{navLinks}</div>
            <Separator></Separator>
            {(role === "admin" || role === "deliveryman") && (
              <div className="px-4">
                <button className="flex w-full rounded-lg items-center px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                  <CgProfile className="w-5 h-5" />
                  <Link to={"/dashboard/profile-all"}>
                    <span className="mx-4 font-medium">Profile</span>
                  </Link>
                </button>
              </div>
            )}
            <div className="lg:my-auto px-4 pb-6">
              <button
                onClick={handleLogOut}
                className="flex w-full rounded-lg items-center px-4 py-2 mt-1 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
              >
                <LogOut className="w-5 h-5" />
                <span className="mx-4 font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 md:hidden items-center gap-4 border-b bg-muted/40 px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-slate-500">
                <Link to={"/"} className="mx-auto gap-2 font-semibold">
                  <div className="font-bold flex items-center gap-1">
                    <img
                      src="https://i.ibb.co/dLWh1Vh/tagged.png"
                      alt=""
                      className="h-8"
                    />
                    TrackNShip
                  </div>
                </Link>
                {navLinks}
                <Separator></Separator>
                {(role === "admin" || role === "deliveryman") && (
                  <div className="px-4">
                    <button className="flex w-full rounded-lg items-center px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <CgProfile className="w-5 h-5" />
                      <Link to={"/dashboard/profile-all"}>
                        <span className="mx-4 font-medium">Profile</span>
                      </Link>
                    </button>
                  </div>
                )}
                <div className="lg:my-auto px-4 pb-6">
                  <button
                    onClick={handleLogOut}
                    className="flex w-full rounded-lg items-center px-4 py-2 mt-1 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="mx-4 font-medium">Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            {/* sm logo */}
            <>
              <div className="flex justify-end w-full md:hidden">
                <Link
                  to={"/"}
                  className="flex items-center gap-2 font-semibold"
                >
                  <div className="font-bold flex items-center gap-1">
                    <img
                      src="https://i.ibb.co/dLWh1Vh/tagged.png"
                      alt=""
                      className="h-8"
                    />
                    TrackNShip
                  </div>
                </Link>
              </div>
            </>
          </header>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
