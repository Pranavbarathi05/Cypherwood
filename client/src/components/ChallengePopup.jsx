// src/components/ChallengePopup.jsx
import React, { useState } from "react";

export default function ChallengePopup({ challenge, closePopup, submitFlag, currentUser }) {
  const [activeTab, setActiveTab] = useState("description");
  const [flagInput, setFlagInput] = useState("");

  const solved = challenge.solves.some((s) => s.user === currentUser);

  const handleSubmit = () => {
    if (flagInput.trim()) {
      submitFlag(challenge.id, flagInput.trim());
      setFlagInput("");
    }
  };

  return (
    <div className="w-2/3 ml-6 border border-green-700 p-4 rounded-lg bg-black/90 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold tracking-widest text-green-400">
          {challenge.name}
        </h2>
        <button
          className="text-red-500 hover:text-red-300 text-xl font-bold"
          onClick={closePopup}
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-green-700 mb-3 flex space-x-4 text-green-400">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-1 ${
            activeTab === "description" ? "border-b-2 border-green-500 font-bold" : ""
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setActiveTab("solves")}
          className={`pb-1 ${
            activeTab === "solves" ? "border-b-2 border-green-500 font-bold" : ""
          }`}
        >
          SOLVES
        </button>
      </div>

      {activeTab === "description" && (
        <div>
          <p className="mb-2 text-green-400">Category: {challenge.domain}</p>
          <p className="mb-4">{challenge.description}</p>

          {challenge.files && challenge.files.length > 0 && (
            <>
              <p className="font-bold">Files:</p>
              <ul className="list-disc ml-6 mb-4">
                {challenge.files.map((file, i) => (
                  <li key={i}>
                    <a
                      href={file.url}
                      className="hover:text-green-300 underline"
                      download
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Hint and Solution buttons (to connect later) */}
          <div className="flex space-x-4 mb-4">
            <button className="border border-green-600 px-3 py-1 rounded hover:bg-green-700 hover:text-black">
              View Hint (-{challenge.hints[0]?.cost || 0} pts)
            </button>
            <button className="border border-green-600 px-3 py-1 rounded hover:bg-green-700 hover:text-black">
              View Solution (-{challenge.solution?.cost || 0} pts)
            </button>
          </div>

          {/* Flag submission */}
          <input
            type="text"
            placeholder="Enter flag"
            className="bg-black border border-green-700 p-2 w-full mb-2 text-green-400 placeholder-green-600"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            disabled={solved}
          />
          <button
            onClick={handleSubmit}
            disabled={solved}
            className={`${
              solved
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600"
            } text-black font-bold px-4 py-2 rounded`}
          >
            {solved ? "Already Solved" : "Submit"}
          </button>
        </div>
      )}

      {activeTab === "solves" && (
        <div className="mt-4">
          {challenge.solves.length === 0 ? (
            <p>No one has solved this challenge yet.</p>
          ) : (
            <ul className="space-y-1">
              {challenge.solves.map((s, i) => (
                <li key={i}>
                  <span className="text-green-400 font-bold">{s.user}</span>{" "}
                  — solved at{" "}
                  <span className="text-green-300">
                    {new Date(s.time).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
