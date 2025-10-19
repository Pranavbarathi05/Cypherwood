// src/components/AdminPanel.jsx
import React, { useState } from "react";
import { generateFlagHash } from "../utils/hashUtils";

export default function AdminPanel({ createChallenge, togglePause }) {
  const [newChallenge, setNewChallenge] = useState({
    name: "",
    domain: "",
    description: "",
    flag: "",
    points: 0,
    difficulty: "",
    hints: [],
    solution: { text: "", cost: 0 },
  });

  const [hintText, setHintText] = useState("");
  const [hintCost, setHintCost] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const addHint = () => {
    if (!hintText || !hintCost) return;
    setNewChallenge((prev) => ({
      ...prev,
      hints: [...prev.hints, { text: hintText, cost: Number(hintCost) }],
    }));
    setHintText("");
    setHintCost("");
  };

  const handleCreateChallenge = () => {
    if (!newChallenge.name || !newChallenge.flag) return alert("Missing fields");

    const challengeToCreate = {
      ...newChallenge,
      flagHash: generateFlagHash(newChallenge.flag),
      paused: false,
      files: [],
    };
    delete challengeToCreate.flag; // don’t store plaintext flag
    createChallenge(challengeToCreate);

    setNewChallenge({
      name: "",
      domain: "",
      description: "",
      flag: "",
      points: 0,
      difficulty: "",
      hints: [],
      solution: { text: "", cost: 0 },
    });
  };

  return (
    <div className="w-2/3 ml-6 border border-green-700 p-4 rounded-lg bg-black/90 shadow-lg h-fit">
      <h2 className="text-2xl font-bold text-green-400 mb-4 tracking-wider">Admin Panel</h2>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Challenge Name"
          value={newChallenge.name}
          onChange={handleInputChange}
          className="w-full bg-black border border-green-700 p-2 text-green-400 placeholder-green-700"
        />

        <input
          type="text"
          name="domain"
          placeholder="Domain (Web, Crypto, etc.)"
          value={newChallenge.domain}
          onChange={handleInputChange}
          className="w-full bg-black border border-green-700 p-2 text-green-400 placeholder-green-700"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={newChallenge.description}
          onChange={handleInputChange}
          className="w-full bg-black border border-green-700 p-2 text-green-400 placeholder-green-700"
        />

        <input
          type="text"
          name="flag"
          placeholder="Flag (plaintext)"
          value={newChallenge.flag}
          onChange={handleInputChange}
          className="w-full bg-black border border-green-700 p-2 text-green-400 placeholder-green-700"
        />

        <div className="flex space-x-4">
          <input
            type="number"
            name="points"
            placeholder="Points"
            value={newChallenge.points}
            onChange={handleInputChange}
            className="bg-black border border-green-700 p-2 w-1/2 text-green-400 placeholder-green-700"
          />
          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty (Easy, Medium, Hard)"
            value={newChallenge.difficulty}
            onChange={handleInputChange}
            className="bg-black border border-green-700 p-2 w-1/2 text-green-400 placeholder-green-700"
          />
        </div>

        {/* Hints */}
        <div className="border-t border-green-700 pt-3">
          <h3 className="text-green-300 font-bold mb-2">Hints</h3>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Hint Text"
              value={hintText}
              onChange={(e) => setHintText(e.target.value)}
              className="bg-black border border-green-700 p-2 w-3/4 text-green-400 placeholder-green-700"
            />
            <input
              type="number"
              placeholder="Cost"
              value={hintCost}
              onChange={(e) => setHintCost(e.target.value)}
              className="bg-black border border-green-700 p-2 w-1/4 text-green-400 placeholder-green-700"
            />
            <button
              onClick={addHint}
              className="bg-green-700 hover:bg-green-600 text-black px-3 py-1 rounded"
            >
              +
            </button>
          </div>
          {newChallenge.hints.length > 0 && (
            <ul className="list-disc ml-6">
              {newChallenge.hints.map((h, i) => (
                <li key={i}>
                  {h.text} (-{h.cost} pts)
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Solution */}
        <div className="border-t border-green-700 pt-3">
          <h3 className="text-green-300 font-bold mb-2">Solution</h3>
          <textarea
            placeholder="Solution Text"
            value={newChallenge.solution.text}
            onChange={(e) =>
              setNewChallenge((prev) => ({
                ...prev,
                solution: { ...prev.solution, text: e.target.value },
              }))
            }
            className="w-full bg-black border border-green-700 p-2 text-green-400 placeholder-green-700 mb-2"
          />
          <input
            type="number"
            placeholder="Cost"
            value={newChallenge.solution.cost}
            onChange={(e) =>
              setNewChallenge((prev) => ({
                ...prev,
                solution: { ...prev.solution, cost: Number(e.target.value) },
              }))
            }
            className="bg-black border border-green-700 p-2 w-full text-green-400 placeholder-green-700"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleCreateChallenge}
          className="bg-green-700 hover:bg-green-600 text-black font-bold px-4 py-2 rounded w-full mt-4"
        >
          Create Challenge
        </button>
      </div>
    </div>
  );
}
