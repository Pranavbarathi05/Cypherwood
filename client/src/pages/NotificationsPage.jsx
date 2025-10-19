// src/pages/NotificationsPage.jsx
import React, { useState } from "react";
import { Bell, Trophy, Users, AlertCircle, CheckCircle, Info, X } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "solve",
      icon: Trophy,
      iconColor: "text-yellow-400",
      title: "Challenge Solved!",
      message: "You successfully solved 'Admin Panel' and earned 200 points!",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "team",
      icon: Users,
      iconColor: "text-blue-400",
      title: "Team Activity",
      message: "SecurityPro from your team solved 'SQL Injection Advanced'",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "competition",
      icon: AlertCircle,
      iconColor: "text-red-400",
      title: "Competition Ending Soon",
      message: "Halloween Hack Fest ends in 2 days. Don't miss your chance!",
      time: "1 day ago",
      read: false
    },
    {
      id: 4,
      type: "system",
      icon: Info,
      iconColor: "text-green-400",
      title: "New Challenges Available",
      message: "5 new challenges have been added to the Web category",
      time: "1 day ago",
      read: true
    },
    {
      id: 5,
      type: "solve",
      icon: Trophy,
      iconColor: "text-yellow-400",
      title: "Challenge Solved!",
      message: "You successfully solved 'Caesar Shift' and earned 100 points!",
      time: "1 day ago",
      read: true
    },
    {
      id: 6,
      type: "team",
      icon: Users,
      iconColor: "text-blue-400",
      title: "Team Invitation",
      message: "NewHacker123 has accepted your team invitation",
      time: "2 days ago",
      read: true
    },
    {
      id: 7,
      type: "system",
      icon: CheckCircle,
      iconColor: "text-green-400",
      title: "Rank Up!",
      message: "Congratulations! You've reached rank #3 on the global leaderboard",
      time: "2 days ago",
      read: true
    },
    {
      id: 8,
      type: "competition",
      icon: AlertCircle,
      iconColor: "text-red-400",
      title: "Competition Starting Soon",
      message: "Halloween Hack Fest begins in 1 hour. Get ready!",
      time: "3 days ago",
      read: true
    },
  ]);

  const [filter, setFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border border-green-700 bg-black p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-3xl font-bold text-green-400">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-green-500 text-sm">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 text-sm"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-green-700 pb-3">
          <button
            onClick={() => setFilter("all")}
            className={`text-sm font-semibold ${
              filter === "all" ? "text-green-400" : "text-green-600 hover:text-green-500"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`text-sm font-semibold ${
              filter === "unread" ? "text-green-400" : "text-green-600 hover:text-green-500"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("solve")}
            className={`text-sm font-semibold ${
              filter === "solve" ? "text-green-400" : "text-green-600 hover:text-green-500"
            }`}
          >
            Solves
          </button>
          <button
            onClick={() => setFilter("team")}
            className={`text-sm font-semibold ${
              filter === "team" ? "text-green-400" : "text-green-600 hover:text-green-500"
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setFilter("competition")}
            className={`text-sm font-semibold ${
              filter === "competition" ? "text-green-400" : "text-green-600 hover:text-green-500"
            }`}
          >
            Competitions
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`border p-4 flex items-start space-x-4 group ${
                  notif.read 
                    ? "border-green-900 bg-black" 
                    : "border-green-700 bg-green-950 bg-opacity-20"
                }`}
              >
                <notif.icon className={`w-6 h-6 ${notif.iconColor} flex-shrink-0 mt-1`} />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold ${notif.read ? "text-green-500" : "text-green-300"}`}>
                      {notif.title}
                    </h3>
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-green-700 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`text-sm mb-2 ${notif.read ? "text-green-600" : "text-green-400"}`}>
                    {notif.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-700">{notif.time}</span>
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-xs text-green-500 hover:text-green-400 underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-green-600 py-12">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No notifications in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
