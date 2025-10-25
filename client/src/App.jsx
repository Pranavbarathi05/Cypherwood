// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import CompetePage from "./pages/CompetePage";
import UserPage from "./pages/UserPage";
import TeamPage from "./pages/TeamPage";
import NotificationsPage from "./pages/NotificationsPage";
import MorePage from "./pages/MorePage";
import "./index.css";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  // User state management
  const [currentUser, setCurrentUser] = useState("admin");
  const [isAdmin] = useState(true); // This user has admin privileges
  const [viewingAsUser, setViewingAsUser] = useState(false);

  // Function to toggle between admin and user view
  const toggleUserView = () => {
    if (isAdmin) {
      setViewingAsUser(!viewingAsUser);
      setCurrentUser(viewingAsUser ? "admin" : "participant1");
    }
  };

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      name: "Admin Panel",
      domain: "Web",
      description: "Find the hidden admin login panel.",
      flagHash:
        "9a03e9cfb7e44f73cb9231b3f3a586a91f45fdb99d3cc4e3eeff77bfa9b0d3d2",
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
      flagHash:
        "f1b43e7e78b3f35c0c47dcb3b4b83b35a2a9641b1e1dfb7a71e5a62cfdfb6cf3",
      points: 100,
      difficulty: "Easy",
      paused: false,
      hints: [{ text: "ROT13 maybe?", cost: 10 }],
      solution: { text: "Shift by 13 worked!", cost: 30 },
      solves: [],
    },
  ]);

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

  // For admin to create challenge
  const createChallenge = (newChallenge) => {
    setChallenges([
      ...challenges,
      { ...newChallenge, id: Date.now(), solves: [] },
    ]);
  };

  // Pause/Resume challenge
  const togglePause = (id) => {
    setChallenges((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, paused: !ch.paused } : ch))
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-green-500 font-mono p-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold tracking-wider">Cypherwood</h1>
        </div>
        <Navbar
          isAdmin={isAdmin}
          viewingAsUser={viewingAsUser}
          onToggleView={toggleUserView}
        />
        <Routes>
          <Route path="/auth" element={<Outlet />}>
            <Route path="login" element={<LoginPage />}></Route> 
            <Route path="register" element={<RegisterPage />}></Route>
          </Route>
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route path="/scoreboard" element={<ScoreboardPage />} />
          <Route path="/compete" element={<CompetePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route
            path="/admin"
            element={
              isAdmin && !viewingAsUser ? (
                <AdminPage
                  challenges={challenges}
                  createChallenge={createChallenge}
                  togglePause={togglePause}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
