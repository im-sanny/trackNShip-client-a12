import { FaStar } from "react-icons/fa6";
import Navs from "./Navs";
import { CiDeliveryTruck } from "react-icons/ci";


const DeliverymanNav = () => {
    return (
        <div>
            <Navs label={"My Delivery"} address={"my-delivery"} icon={CiDeliveryTruck}></Navs>
            <Navs label={"My Reviews"} address={"my-reviews"} icon={FaStar}></Navs>
        </div>
    );
};
export default DeliverymanNav;