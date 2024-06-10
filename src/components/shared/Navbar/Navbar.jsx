import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { IoMdNotificationsOutline } from "react-icons/io";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import DeliverymanModal from "@/components/Modal/DeliverymanModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("LogOut successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const modalHandler = async () => {
    console.log("im interested to be deliveryman");
    try {
      const currentUser = {
        email: user?.email,
        role: "user",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      if (data.modifiedCount > 0) {
        toast.success("Success, please wait for admin approval");
      } else {
        toast.success("request on process, please wait!");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
            isActive
              ? "bg-muted text-green-500"
              : "hover:bg-muted hover:text-green-500"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/dashboard"}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
            isActive
              ? "bg-muted text-green-500"
              : "hover:bg-muted hover:text-green-500"
          }`
        }
      >
        Dashboard
      </NavLink>
      {!user && (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
              isActive
                ? "bg-muted text-green-500"
                : "hover:bg-muted hover:text-green-500"
            }`
          }
        >
          Login
        </NavLink>
      )}
      <NavLink
        to={"/notification"}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
            isActive
              ? "bg-muted text-green-500"
              : "hover:bg-muted hover:text-green-500"
          }`
        }
      >
        Notification
        <IoMdNotificationsOutline
          size={20}
          className="ml-1"
        ></IoMdNotificationsOutline>
      </NavLink>
    </>
  );
  return (
    <div className="">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* sm sidebar */}
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
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">{navLinks}</nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-center items-center lg:justify-start w-full lg:w-0 md:w-0 ">
          <div className="font-bold flex items-center gap-1">
            <img
              src="https://i.ibb.co/dLWh1Vh/tagged.png"
              alt=""
              className="h-8"
            />
            TrackNShip
          </div>
        </div>
        <nav className="hidden flex-col justify-center w-full gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {navLinks}
        </nav>
        <button onClick={handleThemeSwitch}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        <div className="flex justify-end  lg:w- items-center gap-2 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={
                    user && user.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/Mp6rjCg/profile.jpg"
                  }
                  alt="profile"
                  height="30"
                  width="30"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && (
                <DropdownMenuLabel referrerPolicy="no-referrer">
                  {user.displayName}
                </DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />
              <div className="text-center flex justify-center mb-1">
                {/* {user &&  */}
                <DeliverymanModal
                  modalHandler={modalHandler}
                ></DeliverymanModal>
                {/* } */}
              </div>
              <Button
                variant="outline"
                className="text-center flex justify-center mb-1 w-full"
              >
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center text-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
                      isActive
                        ? "bg-muted text-green-500"
                        : "hover:bg-muted hover:text-green-500"
                    }`
                  }
                  to={"/dashboard"}
                >
                  Dashboard
                </NavLink>
              </Button>
              {user && (
                <Button
                  variant="outline"
                  className="flex w-full justify-center"
                >
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
                        isActive
                          ? "bg-muted text-green-500"
                          : "hover:bg-muted hover:text-green-500"
                      }`
                    }
                  >
                    Logout
                  </DropdownMenuItem>
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
