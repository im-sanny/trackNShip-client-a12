import { FaUserGroup } from "react-icons/fa6";
import Navs from "./Navs";
import { LineChart, List, Users2 } from "lucide-react";

const AdminNav = () => {
  return (
    <div>
      <Navs label={"All Parcels"} address={"all-parcel"} icon={List}></Navs>
      <Navs label={"All Users"} address={"all-users"} icon={Users2}></Navs>
      <Navs
        label={"All Delivery Man"}
        address={"all-deliveryman"}
        icon={FaUserGroup}
      ></Navs>
      <Navs label={"Analytics"} address={"analytics"} icon={LineChart}></Navs>
    </div>
  );
};

export default AdminNav;
