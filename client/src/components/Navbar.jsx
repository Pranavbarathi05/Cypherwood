// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, Users, MoreHorizontal, Eye, EyeOff, ChevronDown } from "lucide-react";

export default function Navbar({ isAdmin, viewingAsUser, onToggleView, currentUser }) {
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="flex justify-center items-center border-b border-green-700 pb-2 mb-4">
      <div className="flex items-center text-lg">
        <Link to="/" className={`hover:text-green-300 px-6 mx-2 ${location.pathname === "/" ? "text-green-400" : ""}`}>
          Challenges
        </Link>
        <Link to="/scoreboard" className={`hover:text-green-300 px-6 mx-2 ${location.pathname === "/scoreboard" ? "text-green-400" : ""}`}>
          Scoreboard
        </Link>
        <Link to="/compete" className={`hover:text-green-300 px-6 mx-2 ${location.pathname === "/compete" ? "text-green-400" : ""}`}>
          Compete
        </Link>
        <Link to="/notifications" className={`hover:text-green-300 flex items-center space-x-1 px-6 mx-2 ${location.pathname === "/notifications" ? "text-green-400" : ""}`}>
          <Bell className="w-4 h-4" /> <span>Notifications</span>
        </Link>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border-2 ${
              showProfileDropdown || location.pathname === "/user" || location.pathname === "/team"
                ? "border-green-400 text-green-400"
                : "border-green-500 hover:border-green-300 hover:text-green-300"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-black" />
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showProfileDropdown ? 'transform rotate-180' : ''}`} />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-black border-2 border-green-500 rounded-lg shadow-lg">
              <Link
                to={`/user/${currentUser}`}
                className={`flex items-center space-x-2 px-4 py-2 hover:bg-green-900/20 ${
                  location.pathname.startsWith('/user/') ? "text-green-400" : ""
                }`}
                onClick={() => setShowProfileDropdown(false)}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/team"
                className={`flex items-center space-x-2 px-4 py-2 hover:bg-green-900/20 ${
                  location.pathname === "/team" ? "text-green-400" : ""
                }`}
                onClick={() => setShowProfileDropdown(false)}
              >
                <Users className="w-4 h-4" />
                <span>Team</span>
              </Link>
            </div>
          )}
        </div>
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
