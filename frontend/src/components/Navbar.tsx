import React from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul className="hidden md:flex flex-wrap gap-6">
          <li>
            <NavLink
              to="/children"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Children
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meal-plans"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Meal Plans
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adoptions"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Adoptions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/visitors"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Visitor Logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sponsors"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Sponsors
            </NavLink>
          </li>
        
          <li>
            <NavLink
              to="/sponsorships"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Sponsorships
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-700" : ""}`
              }
            >
              Report
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
