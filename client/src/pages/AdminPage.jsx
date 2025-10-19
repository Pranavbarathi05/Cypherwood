// src/pages/AdminPage.jsx
import React from "react";
import AdminPanel from "../components/AdminPanel";

export default function AdminPage({ challenges, createChallenge, togglePause }) {
  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold tracking-wider">Admin Dashboard</h1>
      </div>
      <AdminPanel createChallenge={createChallenge} togglePause={togglePause} />
    </div>
  );
}