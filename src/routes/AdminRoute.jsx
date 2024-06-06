import useRole from "@/hooks/useRole";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <span>Loading...</span>;
  if (role === "admin") return children;
  return <Navigate to={"/dashboard"}></Navigate>;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
