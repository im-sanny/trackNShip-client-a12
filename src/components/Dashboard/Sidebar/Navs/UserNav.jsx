import { Package, ShoppingCart, Users2 } from "lucide-react";
import Navs from "./Navs";

const UserNav = () => {
  return (
    <div>
      <Navs
        label={"Book Parcel"}
        address={"book-parcel"}
        icon={ShoppingCart}
      ></Navs>
      <Navs label={"My Parcel"} address={"my-parcel"} icon={Package}></Navs>
      <Navs label={"My Profile"} address={"my-profile"} icon={Users2}></Navs>
    </div>
  );
};

export default UserNav;
