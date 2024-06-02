import { Link } from "react-router-dom";
import { CircleUser, Menu } from "lucide-react";
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

const Navbar = () => {
  const navLinks = (
    <>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Home
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground flex items-center"
      >
        Notification
        <IoMdNotificationsOutline
          size={20}
          className="ml-1"
        ></IoMdNotificationsOutline>
      </Link>
      <Link
        to={'/login'}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Login
      </Link>
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

        <div className="flex justify-end lg:w- items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                {/* <span className="sr-only">Toggle user menu</span> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>User Name</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
