// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, Users, MoreHorizontal, Eye, EyeOff } from "lucide-react";

export default function Navbar({ isAdmin, viewingAsUser, onToggleView }) {
  const location = useLocation();
  
  return (
    <div className="flex justify-center items-center border-b border-green-700 pb-2 mb-4">
      <div className="flex items-center text-lg">
        <Link to="/" className={`hover:text-green-300 px-4 ${location.pathname === "/" ? "text-green-400" : ""}`}>
          Challenges
        </Link>
        <Link to="/scoreboard" className={`hover:text-green-300 px-4 ${location.pathname === "/scoreboard" ? "text-green-400" : ""}`}>
          Scoreboard
        </Link>
        <Link to="/compete" className={`hover:text-green-300 px-4 ${location.pathname === "/compete" ? "text-green-400" : ""}`}>
          Compete
        </Link>
        <Link to="/user" className={`hover:text-green-300 flex items-center space-x-1 px-4 ${location.pathname === "/user" ? "text-green-400" : ""}`}>
          <User className="w-4 h-4" /> <span>User</span>
        </Link>
        <Link to="/team" className={`hover:text-green-300 flex items-center space-x-1 px-4 ${location.pathname === "/team" ? "text-green-400" : ""}`}>
          <Users className="w-4 h-4" /> <span>Team</span>
        </Link>
        <Link to="/notifications" className={`hover:text-green-300 flex items-center space-x-1 px-4 ${location.pathname === "/notifications" ? "text-green-400" : ""}`}>
          <Bell className="w-4 h-4" /> <span>Notifications</span>
        </Link>
        <Link to="/more" className={`hover:text-green-300 flex items-center space-x-1 px-4 ${location.pathname === "/more" ? "text-green-400" : ""}`}>
          <MoreHorizontal className="w-4 h-4" /> <span>More</span>
        </Link>
        {isAdmin && (
          <>
            <Link 
              to="/admin" 
              className={`text-green-400 font-bold border-l border-green-700 pl-6 ml-2 hover:text-green-300 ${
                location.pathname === "/admin" ? "text-green-500" : ""
              }`}
            >
              Admin Panel
            </Link>
            <button
              onClick={onToggleView}
              className="flex items-center space-x-1 px-4 ml-2 hover:text-green-300"
              title={viewingAsUser ? "Switch to admin view" : "Switch to user view"}
            >
              {viewingAsUser ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Admin View</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>User View</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
