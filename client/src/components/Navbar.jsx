// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, Users, MoreHorizontal } from "lucide-react";

export default function Navbar({ isAdmin }) {
  const location = useLocation();
  
  return (
    <div className="flex justify-between items-center border-b border-green-700 pb-2 mb-4">
      <div>
        <Link to="/" className="text-xl font-bold hover:text-green-400">
          CTFverse
        </Link>
      </div>
      <div className="flex space-x-8 text-lg">
        <Link to="/" className={`hover:text-green-300 ${location.pathname === "/" ? "text-green-400" : ""}`}>
          Challenges
        </Link>
        <button className="hover:text-green-300">Scoreboard</button>
        <button className="hover:text-green-300">Compete</button>
        <button className="hover:text-green-300 flex items-center space-x-1">
          <User className="w-4 h-4" /> <span>User</span>
        </button>
        <button className="hover:text-green-300 flex items-center space-x-1">
          <Users className="w-4 h-4" /> <span>Team</span>
        </button>
        <button className="hover:text-green-300 flex items-center space-x-1">
          <Bell className="w-4 h-4" /> <span>Notifications</span>
        </button>
        <button className="hover:text-green-300 flex items-center space-x-1">
          <MoreHorizontal className="w-4 h-4" /> <span>More</span>
        </button>
        {isAdmin && (
          <Link 
            to="/admin" 
            className={`text-green-400 font-bold border-l border-green-700 pl-4 hover:text-green-300 ${
              location.pathname === "/admin" ? "text-green-500" : ""
            }`}
          >
            Admin Panel
          </Link>
        )}
      </div>
      <div></div>
    </div>
  );
}
