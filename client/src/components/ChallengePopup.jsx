// src/components/ChallengePopup.jsx
import React, { useState, useRef, useEffect } from "react";

export default function ChallengePopup({ challenge, closePopup, submitFlag, currentUser }) {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Start at 0,0 and we'll update after mount
  const popupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("description");
  const [flagInput, setFlagInput] = useState("");

  // Center the popup when it first mounts or when challenge changes
  useEffect(() => {
    if (popupRef.current) {
      const popupWidth = popupRef.current.offsetWidth;
      const popupHeight = popupRef.current.offsetHeight;
      setPosition({
        x: Math.max(0, (window.innerWidth - popupWidth) / 2),
        y: Math.max(0, (window.innerHeight - popupHeight) / 2)
      });
    }
  }, [challenge]); // Re-center when challenge changes

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      setPosition(prev => ({
        x: Math.min(Math.max(prev.x + dx, 0), window.innerWidth - (popupRef.current?.offsetWidth || 0)),
        y: Math.max(prev.y + dy, 0)
      }));

      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
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
    document.body.style.cursor = 'move';
  };

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
    className="challenge-popup matrix-text fixed z-50 select-none bg-gray-100 border-2 border-green-700 p-4 rounded-lg shadow-lg"
    style={{
      width: "400px",          // static width box
      maxHeight: "80vh",       // 80% of viewport height
      overflowY: "auto",       // scrolls if content exceeds box
      wordWrap: "break-word",  // ensures long text wraps
      whiteSpace: "normal",    // prevents single-line overflow
      cursor: "move",          // shows drag cursor
      top: position.y + "px",  // position from top
      left: position.x + "px", // position from left
      transform: "none"        // remove centering transform
    }}
      
    >
      <div className="challenge-popup-header flex justify-between items-center mb-4" onMouseDown={handleMouseDown}>
        <h2 className="text-2xl font-bold tracking-widest text-green-700">
          {challenge.name}
        </h2>
        <button
          className="close-button border-2 border-red-600 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 font-bold rounded p-1 transition-colors"
          onClick={closePopup}
          title="Close"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-green-700 mb-3 flex space-x-4 text-green-700">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-1 hover:text-green-600 ${
            activeTab === "description" ? "border-b-2 border-green-600 font-bold" : ""
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setActiveTab("solves")}
          className={`pb-1 hover:text-green-600 ${
            activeTab === "solves" ? "border-b-2 border-green-600 font-bold" : ""
          }`}
        >
          SOLVES
        </button>
      </div>

      {activeTab === "description" && (
        <div>
          <p className="mb-2 text-green-700 font-semibold">Category: {challenge.domain}</p>
          <p className="mb-4 text-gray-700">{challenge.description}</p>

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
            <button className="border-2 border-green-700 px-3 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white transition-colors">
              View Hint (-{challenge.hints[0]?.cost || 0} pts)
            </button>
            <button className="border-2 border-green-700 px-3 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white transition-colors">
              View Solution (-{challenge.solution?.cost || 0} pts)
            </button>
          </div>

          {/* Flag submission */}
          <input
            type="text"
            placeholder="Enter flag"
            className="w-full p-2 mb-3 bg-white border-2 border-green-700 rounded text-green-700 focus:outline-none focus:border-green-500 placeholder-green-600"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            disabled={solved}
          />
          <button
            onClick={handleSubmit}
            disabled={solved}
            className={`w-full p-2 bg-green-700 text-black font-bold rounded hover:bg-green-600 transition-colors ${
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
                  <span className="text-green-700 font-bold">{s.user}</span>{" "}
                  — solved at{" "}
                  <span className="text-green-600">
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
