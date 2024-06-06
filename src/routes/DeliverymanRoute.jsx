import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const DeliverymanRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <span>Loading...</span>;
  if (role === "deliveryman") return children;
  return <Navigate to={"/dashboard"}></Navigate>;
};

export default DeliverymanRoute;

DeliverymanRoute.propTypes = {
  children: PropTypes.element,
};
