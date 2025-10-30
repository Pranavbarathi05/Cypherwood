// src/pages/ScoreboardPage.jsx
import React from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScoreboardPage({ currentUser }) {
  const navigate = useNavigate();
  
  // Raw leaderboard data including all users
  const fullLeaderboard = [
    { rank: 1, username: "CyberNinja", score: 1250, solves: 15, team: "HackTheBox" },
    { rank: 2, username: "CodeBreaker", score: 1100, solves: 13, team: "CyberSquad" },
    { rank: 3, username: "user1", score: 950, solves: 11, team: "RedTeam" },
    { rank: 4, username: "SecurityPro", score: 850, solves: 10, team: "BlueTeam" },
    { rank: 5, username: "L33tHacker", score: 800, solves: 9, team: "PwnStars" },
    { rank: 6, username: "ByteMaster", score: 750, solves: 8, team: "HackTheBox" },
    { rank: 7, username: "CryptoKing", score: 700, solves: 8, team: "CyberSquad" },
    { rank: 8, username: "WebExploit", score: 650, solves: 7, team: "RedTeam" },
    { rank: 9, username: "ReverseEng", score: 600, solves: 7, team: "BlueTeam" },
    { rank: 10, username: "ForensicAce", score: 550, solves: 6, team: "PwnStars" },
  ];

  // Filter out admin users and rerank the leaderboard
  const leaderboard = fullLeaderboard
    .filter(player => !player.username.includes('admin'))
    .map((player, index) => ({
      ...player,
      rank: index + 1
    }));

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-700" />;
    return <span className="w-6 text-center">{rank}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border border-green-700 bg-black p-6">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          🏆 Global Scoreboard 🏆
        </h2>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-green-500">
            <span className="text-green-300">Last Updated:</span> 2 minutes ago
          </div>
          <div className="text-sm text-green-500">
            <span className="text-green-300">Total Participants:</span> 247
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-green-700 text-green-400">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-4 text-right">Solves</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player) => (
                <tr 
                  key={player.rank} 
                  className={`border-b border-green-900 hover:bg-green-950 ${
                    player.username === currentUser ? "bg-green-900 bg-opacity-20" : ""
                  }`}
                >
                  <td className="py-3 px-4 flex items-center space-x-2">
                    {getRankIcon(player.rank)}
                  </td>
                  <td className="py-3 px-4 text-green-300 font-semibold">
                    <button
                      onClick={() => navigate(`/user/${player.username}`)}
                      className="hover:text-green-200 transition-colors focus:outline-none"
                    >
                      {player.username}
                    </button>
                    {player.username === currentUser && (
                      <span className="ml-2 text-xs text-green-400">(You)</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-green-500">{player.team}</td>
                  <td className="py-3 px-4 text-right text-green-300">{player.solves}</td>
                  <td className="py-3 px-4 text-right text-green-400 font-bold">
                    {player.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentUser && currentUser !== 'admin' && (
          <div className="mt-6 p-4 border border-green-800 bg-green-950 bg-opacity-30">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Your Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {(() => {
                const userStats = leaderboard.find(p => p.username === currentUser);
                if (userStats) {
                  return (
                    <>
                      <div>
                        <div className="text-2xl font-bold text-green-300">#{userStats.rank}</div>
                        <div className="text-sm text-green-500">Global Rank</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-300">{userStats.solves}</div>
                        <div className="text-sm text-green-500">Challenges Solved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-300">{userStats.score}</div>
                        <div className="text-sm text-green-500">Total Points</div>
                      </div>
                    </>
                  );
                }
                return (
                  <div className="col-span-3 text-center text-green-400">
                    Complete challenges to appear on the scoreboard!
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
