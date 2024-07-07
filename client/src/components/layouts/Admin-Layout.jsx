import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome, FaEnvelope } from "react-icons/fa"; // Correct import for icons

export const AdminLayout = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/users">
                <FaUser /> User
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <FaEnvelope /> Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/service">
                <FaRegListAlt /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  );
};
