// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import ChallengeList from "../components/ChallengeList";
import ChallengePopup from "../components/ChallengePopup";
import { verifyFlagHash } from "../utils/hashUtils";

export default function HomePage({ currentUser }) {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Simulated backend fetch
  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    // Replace with API call later
    const mockData = [
      {
        id: 1,
        name: "Admin Panel",
        domain: "Web",
        description: "Find the hidden admin login panel.",
        flagHash: "9a03e9cfb7e44f73cb9231b3f3a586a91f45fdb99d3cc4e3eeff77bfa9b0d3d2",
        points: 200,
        difficulty: "Medium",
        paused: false,
        hints: [{ text: "Try /admin path", cost: 20 }],
        solution: { text: "SQLi payload reveals admin", cost: 50 },
        solves: [],
      },
      {
        id: 2,
        name: "Caesar Shift",
        domain: "Crypto",
        description: "A simple Caesar cipher encryption.",
        flagHash: "f1b43e7e78b3f35c0c47dcb3b4b83b35a2a9641b1e1dfb7a71e5a62cfdfb6cf3",
        points: 100,
        difficulty: "Easy",
        paused: false,
        hints: [{ text: "ROT13 maybe?", cost: 10 }],
        solution: { text: "Shift by 13 worked!", cost: 30 },
        solves: [],
      },
    ];
    setChallenges(mockData);
  };

  // Handle user submitting a flag
  const submitFlag = (id, enteredFlag) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const alreadySolved = ch.solves.find((s) => s.user === currentUser);
          if (alreadySolved) return ch; // already solved — no points

          if (verifyFlagHash(enteredFlag, ch.flagHash)) {
            const solve = { user: currentUser, time: new Date().toISOString() };
            return { ...ch, solves: [...ch.solves, solve] };
          }
        }
        return ch;
      })
    );
  };

  // Handle clicking a challenge
  const handleChallengeClick = (challenge) => {
    if (challenge.paused) return;
    setSelectedChallenge(challenge);
    setShowPopup(true);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold tracking-wider">CTFverse</h1>
      </div>

      <div className="flex">
        <ChallengeList
          challenges={challenges}
          onChallengeClick={handleChallengeClick}
          currentUser={currentUser}
        />
      </div>

      {showPopup && selectedChallenge && (
        <ChallengePopup
          challenge={selectedChallenge}
          closePopup={() => setShowPopup(false)}
          submitFlag={submitFlag}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}