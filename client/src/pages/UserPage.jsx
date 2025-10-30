// src/pages/UserPage.jsx
import React, { useState } from "react";
import { User, Mail, MapPin, Calendar, Trophy, Target, Award, Edit2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserPage({ currentUser }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profiles data - in a real app, you would fetch this from an API
  const mockProfiles = {
    CyberNinja: {
      username: "CyberNinja",
      email: "ninja@cypherwood.com",
      location: "Tokyo, Japan",
      joinDate: "2024-02-01",
      bio: "Professional CTF player and security researcher. Specializing in binary exploitation and reverse engineering. Currently ranked #1 globally.",
      rank: 1,
      totalPoints: 1250,
      totalSolves: 15,
      teamName: "HackTheBox",
      avatarColor: "bg-blue-700"
    },
    CodeBreaker: {
      username: "CodeBreaker",
      email: "codebreaker@cypherwood.com",
      location: "London, UK",
      joinDate: "2024-02-15",
      bio: "Security enthusiast with a focus on cryptography and web security. Love breaking complex encryption challenges.",
      rank: 2,
      totalPoints: 1100,
      totalSolves: 13,
      teamName: "CyberSquad",
      avatarColor: "bg-purple-700"
    },
    admin: {
      username: "admin",
      email: "admin@cypherwood.com",
      location: "San Francisco, CA",
      joinDate: "2024-03-15",
      bio: "Platform administrator and challenge creator. Passionate about cybersecurity education.",
      rank: 3,
      totalPoints: 950,
      totalSolves: 11,
      teamName: "RedTeam",
      avatarColor: "bg-green-700"
    },
    SecurityPro: {
      username: "SecurityPro",
      email: "security@cypherwood.com",
      location: "Berlin, Germany",
      joinDate: "2024-02-20",
      bio: "Blue team specialist focused on defensive security. Expert in incident response and threat hunting.",
      rank: 4,
      totalPoints: 850,
      totalSolves: 10,
      teamName: "BlueTeam",
      avatarColor: "bg-cyan-700"
    },
    L33tHacker: {
      username: "L33tHacker",
      email: "leet@cypherwood.com",
      location: "New York, USA",
      joinDate: "2024-03-01",
      bio: "Competitive hacker specializing in binary exploitation. Always up for a good pwn challenge.",
      rank: 5,
      totalPoints: 800,
      totalSolves: 9,
      teamName: "PwnStars",
      avatarColor: "bg-red-700"
    },
    ByteMaster: {
      username: "ByteMaster",
      email: "byte@cypherwood.com",
      location: "Seoul, South Korea",
      joinDate: "2024-02-28",
      bio: "Assembly wizard and low-level programming expert. Love diving deep into binary challenges.",
      rank: 6,
      totalPoints: 750,
      totalSolves: 8,
      teamName: "HackTheBox",
      avatarColor: "bg-yellow-700"
    },
    CryptoKing: {
      username: "CryptoKing",
      email: "crypto@cypherwood.com",
      location: "Paris, France",
      joinDate: "2024-03-05",
      bio: "Cryptography enthusiast with a PhD in Mathematics. Specialized in breaking classical and modern ciphers.",
      rank: 7,
      totalPoints: 700,
      totalSolves: 8,
      teamName: "CyberSquad",
      avatarColor: "bg-emerald-700"
    },
    WebExploit: {
      username: "WebExploit",
      email: "web@cypherwood.com",
      location: "Amsterdam, Netherlands",
      joinDate: "2024-03-10",
      bio: "Web security researcher and bug bounty hunter. OWASP contributor and XSS specialist.",
      rank: 8,
      totalPoints: 650,
      totalSolves: 7,
      teamName: "RedTeam",
      avatarColor: "bg-orange-700"
    },
    ReverseEng: {
      username: "ReverseEng",
      email: "reverse@cypherwood.com",
      location: "Moscow, Russia",
      joinDate: "2024-03-12",
      bio: "Reverse engineering expert focusing on malware analysis and anti-debugging techniques.",
      rank: 9,
      totalPoints: 600,
      totalSolves: 7,
      teamName: "BlueTeam",
      avatarColor: "bg-indigo-700"
    },
    ForensicAce: {
      username: "ForensicAce",
      email: "forensics@cypherwood.com",
      location: "Sydney, Australia",
      joinDate: "2024-03-20",
      bio: "Digital forensics investigator specialized in memory analysis and disk forensics.",
      rank: 10,
      totalPoints: 550,
      totalSolves: 6,
      teamName: "PwnStars",
      avatarColor: "bg-violet-700"
    }
  };

  const userProfile = mockProfiles[username] || {
    username: "admin",
    email: "admin@cypherwood.com",
    location: "San Francisco, CA",
    joinDate: "2024-03-15",
    bio: "Passionate about cybersecurity and ethical hacking. Love solving crypto and web exploitation challenges.",
    rank: 3,
    totalPoints: 950,
    totalSolves: 11,
    teamName: "RedTeam",
    avatarColor: "bg-green-700"
  };

  const solvedChallenges = [
    { id: 1, name: "Admin Panel", domain: "Web", points: 200, solvedDate: "2025-10-18" },
    { id: 2, name: "Caesar Shift", domain: "Crypto", points: 100, solvedDate: "2025-10-18" },
    { id: 3, name: "SQL Injection Basic", domain: "Web", points: 150, solvedDate: "2025-10-17" },
    { id: 4, name: "Buffer Overflow", domain: "Binary", points: 300, solvedDate: "2025-10-15" },
    { id: 5, name: "XSS Playground", domain: "Web", points: 100, solvedDate: "2025-10-14" },
    { id: 6, name: "RSA Weaknesses", domain: "Crypto", points: 250, solvedDate: "2025-10-12" },
    { id: 7, name: "File Upload Bypass", domain: "Web", points: 200, solvedDate: "2025-10-10" },
    { id: 8, name: "JWT Manipulation", domain: "Web", points: 150, solvedDate: "2025-10-08" },
    { id: 9, name: "Steganography 101", domain: "Forensics", points: 100, solvedDate: "2025-10-06" },
    { id: 10, name: "Path Traversal", domain: "Web", points: 100, solvedDate: "2025-10-04" },
    { id: 11, name: "XXE Injection", domain: "Web", points: 200, solvedDate: "2025-10-02" },
  ];

  const stats = [
    { icon: Trophy, label: "Global Rank", value: `#${userProfile.rank}`, color: "text-yellow-400" },
    { icon: Target, label: "Total Points", value: userProfile.totalPoints, color: "text-green-400" },
    { icon: Award, label: "Challenges Solved", value: userProfile.totalSolves, color: "text-blue-400" },
  ];

  const categoryBreakdown = [
    { category: "Web", solved: 7, total: 15, color: "bg-green-600" },
    { category: "Crypto", solved: 2, total: 10, color: "bg-blue-600" },
    { category: "Binary", solved: 1, total: 8, color: "bg-red-600" },
    { category: "Forensics", solved: 1, total: 6, color: "bg-yellow-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-400 hover:text-green-300 flex items-center"
      >
        ← Back
      </button>

      {/* Profile Header */}
      <div className="border border-green-700 bg-black p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-6">
            <div className={`w-24 h-24 ${userProfile.avatarColor} rounded-full flex items-center justify-center`}>
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">{userProfile.username}</h2>
              <div className="space-y-1 text-green-500">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {userProfile.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userProfile.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {userProfile.joinDate}
                </div>
              </div>
            </div>
          </div>
          {username === currentUser && ( // Only show edit button for your own profile
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 flex items-center"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
        
        <p className="text-green-300 mb-4 border-t border-green-900 pt-4">
          {userProfile.bio}
        </p>
        
        <div className="text-green-500">
          <span className="text-green-400 font-semibold">Team:</span> {userProfile.teamName}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="border border-green-700 bg-black p-6 text-center">
            <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-sm text-green-600 mb-1">{stat.label}</div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Category Progress</h3>
        <div className="space-y-4">
          {categoryBreakdown.map((cat, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-green-300 font-semibold">{cat.category}</span>
                <span className="text-green-500">{cat.solved}/{cat.total}</span>
              </div>
              <div className="w-full bg-green-950 h-3 rounded">
                <div 
                  className={`${cat.color} h-3 rounded`}
                  style={{ width: `${(cat.solved / cat.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solved Challenges */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Solved Challenges</h3>
        <div className="space-y-2">
          {solvedChallenges.map((challenge) => (
            <div 
              key={challenge.id}
              className="flex justify-between items-center border-b border-green-900 py-3 hover:bg-green-950 px-2"
            >
              <div className="flex items-center space-x-4">
                <Award className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-green-300 font-semibold">{challenge.name}</div>
                  <div className="text-green-600 text-sm">{challenge.domain}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{challenge.points} pts</div>
                <div className="text-green-600 text-sm">{challenge.solvedDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
