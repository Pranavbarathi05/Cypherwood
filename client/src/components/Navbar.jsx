// src/components/Navbar.jsx
import React from "react";
import { Bell, User, Users, MoreHorizontal } from "lucide-react";

export default function Navbar({ isAdmin }) {
  return (
    <div className="flex justify-between items-center border-b border-green-700 pb-2 mb-4">
      <div></div>
      <div className="flex space-x-8 text-lg">
        <button className="hover:text-green-300">Challenges</button>
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
          <span className="text-green-400 font-bold border-l border-green-700 pl-4">
            Admin Panel Active
          </span>
        )}
      </div>
      <div></div>
    </div>
  );
}
