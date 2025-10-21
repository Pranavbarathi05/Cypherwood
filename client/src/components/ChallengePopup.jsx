// src/components/ChallengePopup.jsx
import React, { useState, useRef, useEffect } from "react";

export default function ChallengePopup({ challenge, closePopup, submitFlag, currentUser }) {
  const [position, setPosition] = useState({ x: window.innerWidth - 440, y: 100 });
  const popupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      setPosition(prev => ({
        x: Math.min(Math.max(prev.x + dx, 0), window.innerWidth - popupRef.current.offsetWidth),
        y: Math.max(prev.y + dy, 0)
      }));

      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.popup-content')) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };
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
    <div
    ref={popupRef}
    className="challenge-popup matrix-text fixed top-0 left-0 z-50 select-none"
    style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
      width: "400px",          // static width box
      maxHeight: "600px",      // fixed height limit
      overflowY: "auto",       // scrolls if content exceeds box
      wordWrap: "break-word",  // ensures long text wraps
      whiteSpace: "normal",    // prevents single-line overflow
      cursor: "move"           // shows drag cursor
    }}
      
    >
      <div className="challenge-popup-header" onMouseDown={handleMouseDown}>
        <h2 className="text-2xl font-bold tracking-widest text-green-400">
          {challenge.name}
        </h2>
        <button
          className="close-button hover:bg-red-900/20"
          onClick={closePopup}
          title="Close"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
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
            className="matrix-input"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            disabled={solved}
          />
          <button
            onClick={handleSubmit}
            disabled={solved}
            className={`matrix-button w-full ${
              solved ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
