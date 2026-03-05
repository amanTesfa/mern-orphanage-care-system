import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/children", label: "Children" },
  { to: "/staff", label: "Staff" },
  { to: "/meal-plans", label: "Meal Plans" },
  { to: "/adoptions", label: "Adoptions" },
  { to: "/visitors", label: "Visitor Logs" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/sponsorships", label: "Sponsorships" },
  { to: "/expenses", label: "Report" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  return (
    <>
      {/* desktop */}
      <aside className="hidden md:block w-64 bg-white border-r">
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded hover:bg-gray-100 ${
                      isActive ? "bg-gray-200 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={onClose}
          />
          <aside className="relative w-64 bg-white border-r">
            <nav className="p-4">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded hover:bg-gray-100 ${
                          isActive
                            ? "bg-gray-200 font-semibold"
                            : "text-gray-700"
                        }`
                      }
                      onClick={onClose}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
