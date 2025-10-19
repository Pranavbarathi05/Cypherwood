// src/pages/MorePage.jsx
import React from "react";
import { Settings, HelpCircle, FileText, Shield, Users, Award, BookOpen, Github, Twitter, Mail } from "lucide-react";

export default function MorePage() {
  const sections = [
    {
      title: "Account",
      items: [
        { icon: Settings, label: "Settings", description: "Manage your account preferences" },
        { icon: Shield, label: "Security", description: "Two-factor authentication and security settings" },
        { icon: Award, label: "Achievements", description: "View your badges and achievements" },
      ]
    },
    {
      title: "Resources",
      items: [
        { icon: BookOpen, label: "Learning Resources", description: "CTF writeups and tutorials" },
        { icon: HelpCircle, label: "Help & Support", description: "Get help with challenges or technical issues" },
        { icon: FileText, label: "Documentation", description: "Platform rules and guidelines" },
      ]
    },
    {
      title: "Community",
      items: [
        { icon: Users, label: "Discord Server", description: "Join our community on Discord" },
        { icon: Github, label: "GitHub", description: "Contribute to open-source challenges" },
        { icon: Twitter, label: "Twitter", description: "Follow us for updates and announcements" },
      ]
    },
  ];

  const quickStats = [
    { label: "Total Users", value: "2,456" },
    { label: "Active Teams", value: "324" },
    { label: "Total Challenges", value: "156" },
    { label: "Competitions", value: "12" },
  ];

  const recentUpdates = [
    { date: "2025-10-18", title: "New Web Challenges Added", description: "5 new web exploitation challenges now available" },
    { date: "2025-10-15", title: "Competition Announced", description: "Winter CTF Challenge 2025 registration now open" },
    { date: "2025-10-10", title: "Platform Update", description: "Performance improvements and bug fixes" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="border border-green-700 bg-black p-6">
        <h2 className="text-3xl font-bold text-green-400 mb-2">More</h2>
        <p className="text-green-500">Additional resources and platform information</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="border border-green-700 bg-black p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
            <div className="text-sm text-green-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border border-green-700 bg-black p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="border border-green-800 p-4 hover:border-green-600 cursor-pointer transition-colors group"
              >
                <item.icon className="w-8 h-8 text-green-400 mb-3 group-hover:text-green-300" />
                <h4 className="text-green-300 font-semibold mb-2 group-hover:text-green-200">
                  {item.label}
                </h4>
                <p className="text-green-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Recent Updates */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => (
            <div key={index} className="border-l-2 border-green-600 pl-4 py-2">
              <div className="text-green-600 text-sm mb-1">{update.date}</div>
              <h4 className="text-green-300 font-semibold mb-1">{update.title}</h4>
              <p className="text-green-500 text-sm">{update.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Contact Us</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 text-green-500">
            <Mail className="w-5 h-5 text-green-400" />
            <span>support@ctfverse.com</span>
          </div>
          <div className="flex items-center space-x-3 text-green-500">
            <Github className="w-5 h-5 text-green-400" />
            <span>github.com/ctfverse</span>
          </div>
          <div className="flex items-center space-x-3 text-green-500">
            <Twitter className="w-5 h-5 text-green-400" />
            <span>@ctfverse</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border border-green-700 bg-black p-4 text-center text-green-600 text-sm">
        <p>CTFverse v1.0.0 • © 2025 • Made with 💚 by the cybersecurity community</p>
      </div>
    </div>
  );
}
