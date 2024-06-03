/* eslint-disable react/no-unknown-property */
import {
  Bell,
  Home,
  LineChart,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const navLinks = (
    <>
      <nav className="grid items-start px-2 space-y-2 text-sm font-medium lg:px-4">
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
          <Home className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink
          to={""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
              isActive
                ? "bg-muted text-green-500"
                : "hover:bg-muted hover:text-green-500"
            }`
          }
        >
          <ShoppingCart className="h-4 w-4" />
          Orders
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </NavLink>
        <NavLink
          to={""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
              isActive
                ? "bg-muted text-green-500"
                : "hover:bg-muted hover:text-green-500"
            }`
          }
        >
          <Package className="h-4 w-4" />
          Products{" "}
        </NavLink>
        <NavLink
          to={""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
              isActive
                ? "bg-muted text-green-500"
                : "hover:bg-muted hover:text-green-500"
            }`
          }
        >
          <Users className="h-4 w-4" />
          Customers
        </NavLink>
        <NavLink
          to={""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
              isActive
                ? "bg-muted text-green-500"
                : "hover:bg-muted hover:text-green-500"
            }`
          }
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </NavLink>
      </nav>
    </>
  );
  return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
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
            <div className="mt-auto p-4">
              <button className="flex w-full rounded-lg items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
                <Settings className="w-5 h-5" />

                <span className="mx-4 font-medium">Profile</span>
              </button>
              <button
                // onClick={logOut}
                className="flex w-full rounded-lg items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
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
              <SheetContent side="left" className="flex flex-col">
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
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
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
    </div>
  );
};

export default Sidebar;
