/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Navs = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all ${
          isActive
            ? "bg-muted text-green-500"
            : "hover:bg-muted hover:text-green-500"
        }`
      }
    >
      <Icon className="h-4 w-4" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export default Navs;
