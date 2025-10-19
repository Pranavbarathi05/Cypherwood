// src/pages/CompetePage.jsx
import React, { useState } from "react";
import { Calendar, Clock, Users, Trophy, ChevronRight } from "lucide-react";

export default function CompetePage() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const competitions = {
    upcoming: [
      {
        id: 1,
        name: "Winter CTF Challenge 2025",
        startDate: "2025-12-01",
        endDate: "2025-12-03",
        participants: 0,
        maxParticipants: 500,
        prizePool: "$5,000",
        difficulty: "Medium",
        status: "Registration Open"
      },
      {
        id: 2,
        name: "Cyber Security Sprint",
        startDate: "2025-11-15",
        endDate: "2025-11-16",
        participants: 0,
        maxParticipants: 300,
        prizePool: "$2,000",
        difficulty: "Easy",
        status: "Registration Open"
      },
    ],
    ongoing: [
      {
        id: 3,
        name: "Halloween Hack Fest",
        startDate: "2025-10-19",
        endDate: "2025-10-22",
        participants: 247,
        maxParticipants: 400,
        prizePool: "$3,000",
        difficulty: "Hard",
        status: "Live",
        timeRemaining: "2d 14h 32m"
      },
    ],
    past: [
      {
        id: 4,
        name: "Summer Security Showdown",
        startDate: "2025-08-10",
        endDate: "2025-08-12",
        participants: 456,
        maxParticipants: 500,
        prizePool: "$7,500",
        difficulty: "Hard",
        status: "Completed",
        winner: "CyberNinja"
      },
      {
        id: 5,
        name: "Spring Crypto Challenge",
        startDate: "2025-05-20",
        endDate: "2025-05-21",
        participants: 312,
        maxParticipants: 350,
        prizePool: "$2,500",
        difficulty: "Medium",
        status: "Completed",
        winner: "CodeBreaker"
      },
    ],
  };

  const renderCompetitionCard = (comp) => (
    <div 
      key={comp.id} 
      className="border border-green-700 bg-black p-5 hover:border-green-500 transition-colors cursor-pointer mb-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-1">{comp.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-green-500">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {comp.startDate} - {comp.endDate}
            </span>
            {comp.timeRemaining && (
              <span className="flex items-center text-yellow-400">
                <Clock className="w-4 h-4 mr-1" />
                {comp.timeRemaining}
              </span>
            )}
          </div>
        </div>
        <div className={`px-3 py-1 text-xs font-semibold rounded ${
          comp.status === "Live" ? "bg-red-900 text-red-300" :
          comp.status === "Registration Open" ? "bg-green-900 text-green-300" :
          "bg-gray-800 text-gray-400"
        }`}>
          {comp.status}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-green-600 mb-1">Participants</div>
          <div className="text-green-300 font-semibold flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {comp.participants}/{comp.maxParticipants}
          </div>
        </div>
        <div>
          <div className="text-green-600 mb-1">Prize Pool</div>
          <div className="text-green-300 font-semibold flex items-center">
            <Trophy className="w-4 h-4 mr-1" />
            {comp.prizePool}
          </div>
        </div>
        <div>
          <div className="text-green-600 mb-1">Difficulty</div>
          <div className={`font-semibold ${
            comp.difficulty === "Easy" ? "text-green-400" :
            comp.difficulty === "Medium" ? "text-yellow-400" :
            "text-red-400"
          }`}>
            {comp.difficulty}
          </div>
        </div>
        <div className="flex items-end justify-end">
          {comp.winner ? (
            <div className="text-right">
              <div className="text-green-600 mb-1">Winner</div>
              <div className="text-green-300 font-semibold">{comp.winner}</div>
            </div>
          ) : (
            <button className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 flex items-center">
              {comp.status === "Live" ? "Join Now" : "Register"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border border-green-700 bg-black p-6">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          🎯 CTF Competitions 🎯
        </h2>

        <div className="flex space-x-4 mb-6 border-b border-green-700">
          <button
            onClick={() => setSelectedTab("upcoming")}
            className={`pb-3 px-4 font-semibold ${
              selectedTab === "upcoming"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-green-600 hover:text-green-500"
            }`}
          >
            Upcoming ({competitions.upcoming.length})
          </button>
          <button
            onClick={() => setSelectedTab("ongoing")}
            className={`pb-3 px-4 font-semibold ${
              selectedTab === "ongoing"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-green-600 hover:text-green-500"
            }`}
          >
            Ongoing ({competitions.ongoing.length})
          </button>
          <button
            onClick={() => setSelectedTab("past")}
            className={`pb-3 px-4 font-semibold ${
              selectedTab === "past"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-green-600 hover:text-green-500"
            }`}
          >
            Past ({competitions.past.length})
          </button>
        </div>

        <div>
          {competitions[selectedTab].map(renderCompetitionCard)}
        </div>

        {competitions[selectedTab].length === 0 && (
          <div className="text-center text-green-600 py-12">
            No competitions in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
