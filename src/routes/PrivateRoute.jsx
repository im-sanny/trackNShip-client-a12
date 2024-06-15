/* eslint-disable react/prop-types */
import Loading from "@/components/Loading/Loading";
import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="">
    <Loading></Loading>
  </div>;
  if (user) return children;

  return (
    <Navigate to={"/login"} state={location.pathname} replace="true"></Navigate>
  );
};

export default PrivateRoute;
