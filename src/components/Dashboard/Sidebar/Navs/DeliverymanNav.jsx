import { FaStar } from "react-icons/fa6";
import Navs from "./Navs";
import { CiDeliveryTruck } from "react-icons/ci";


const DeliverymanNav = () => {
    return (
        <div className="space-y-2">
            <Navs label={"My Delivery list"} address={"my-delivery-list"} icon={CiDeliveryTruck}></Navs>
            <Navs label={"My Reviews"} address={"my-reviews"} icon={FaStar}></Navs>
        </div>
    );
};
export default DeliverymanNav;