// src/pages/TeamPage.jsx
import React from "react";
import { Users, Trophy, Target, UserPlus, Mail, Crown } from "lucide-react";

export default function TeamPage() {
  const teamInfo = {
    name: "RedTeam",
    description: "Elite group of security researchers focused on web exploitation and reverse engineering challenges.",
    rank: 2,
    totalPoints: 2450,
    totalSolves: 28,
    createdDate: "2024-01-10",
    captainUsername: "admin"
  };

  const teamMembers = [
    { 
      id: 1, 
      username: "admin", 
      role: "Captain", 
      points: 950, 
      solves: 11, 
      joinDate: "2024-01-10",
      isCaptain: true 
    },
    { 
      id: 2, 
      username: "SecurityPro", 
      role: "Member", 
      points: 850, 
      solves: 10, 
      joinDate: "2024-02-15",
      isCaptain: false 
    },
    { 
      id: 3, 
      username: "WebExploit", 
      role: "Member", 
      points: 650, 
      solves: 7, 
      joinDate: "2024-04-20",
      isCaptain: false 
    },
  ];

  const recentTeamSolves = [
    { challengeName: "Admin Panel", solver: "admin", points: 200, time: "2 hours ago" },
    { challengeName: "SQL Injection Advanced", solver: "SecurityPro", points: 250, time: "5 hours ago" },
    { challengeName: "CSRF Token Bypass", solver: "WebExploit", points: 150, time: "1 day ago" },
    { challengeName: "Caesar Shift", solver: "admin", points: 100, time: "1 day ago" },
    { challengeName: "JWT Exploit", solver: "SecurityPro", points: 200, time: "2 days ago" },
  ];

  const invitations = [
    { username: "NewHacker123", sentDate: "2025-10-18", status: "Pending" },
    { username: "CryptoWizard", sentDate: "2025-10-15", status: "Pending" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Team Header */}
      <div className="border border-green-700 bg-black p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-green-400 mb-2">{teamInfo.name}</h2>
            <p className="text-green-300 mb-4">{teamInfo.description}</p>
            <div className="text-green-500 text-sm space-y-1">
              <div><span className="text-green-400 font-semibold">Captain:</span> {teamInfo.captainUsername}</div>
              <div><span className="text-green-400 font-semibold">Members:</span> {teamMembers.length}</div>
              <div><span className="text-green-400 font-semibold">Created:</span> {teamInfo.createdDate}</div>
            </div>
          </div>
          <button className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-green-700 bg-black p-6 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-sm text-green-600 mb-1">Team Rank</div>
          <div className="text-3xl font-bold text-yellow-400">#{teamInfo.rank}</div>
        </div>
        <div className="border border-green-700 bg-black p-6 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-sm text-green-600 mb-1">Total Points</div>
          <div className="text-3xl font-bold text-green-400">{teamInfo.totalPoints}</div>
        </div>
        <div className="border border-green-700 bg-black p-6 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-sm text-green-600 mb-1">Total Solves</div>
          <div className="text-3xl font-bold text-blue-400">{teamInfo.totalSolves}</div>
        </div>
      </div>

      {/* Team Members */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Team Members</h3>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="flex justify-between items-center border border-green-800 p-4 hover:border-green-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
                  {member.isCaptain ? (
                    <Crown className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Users className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-300 font-semibold">{member.username}</span>
                    {member.isCaptain && (
                      <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">
                        Captain
                      </span>
                    )}
                  </div>
                  <div className="text-green-600 text-sm">Joined {member.joinDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{member.points} pts</div>
                <div className="text-green-600 text-sm">{member.solves} solves</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Team Activity */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Recent Team Solves</h3>
        <div className="space-y-2">
          {recentTeamSolves.map((solve, index) => (
            <div 
              key={index}
              className="flex justify-between items-center border-b border-green-900 py-3 hover:bg-green-950 px-2"
            >
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-green-300 font-semibold">{solve.challengeName}</div>
                  <div className="text-green-600 text-sm">Solved by {solve.solver}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">+{solve.points} pts</div>
                <div className="text-green-600 text-sm">{solve.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="border border-green-700 bg-black p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Pending Invitations</h3>
        {invitations.length > 0 ? (
          <div className="space-y-3">
            {invitations.map((invite, index) => (
              <div 
                key={index}
                className="flex justify-between items-center border border-green-800 p-4"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-green-300 font-semibold">{invite.username}</div>
                    <div className="text-green-600 text-sm">Invited on {invite.sentDate}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm">{invite.status}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-green-600 text-center py-4">No pending invitations</div>
        )}
      </div>
    </div>
  );
}
