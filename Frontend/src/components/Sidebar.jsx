import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserFriends, FaCarSide } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-green-700 text-white min-h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
        <nav className="space-y-4">
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-green-600 ${
                isActive ? 'bg-green-600' : ''
              }`
            }
          >
            Clients
          </NavLink>
          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-green-600 ${
                isActive ? 'bg-green-600' : ''
              }`
            }
          >
            Voitures
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;