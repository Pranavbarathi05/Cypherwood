// src/components/ChallengeList.jsx
import React, { useState } from "react";

export default function ChallengeList({ challenges, onChallengeClick, currentUser }) {
  const [activeDomain, setActiveDomain] = useState(null);

  // Group challenges by domain
  const domains = [...new Set(challenges.map((c) => c.domain))];

  return (
    <div className="w-1/3 space-y-2">
      {domains.map((domain) => {
        const domainChallenges = challenges.filter((c) => c.domain === domain);
        const isActive = activeDomain === domain;

        return (
          <div key={domain}>
            <div
              className="cursor-pointer hover:text-green-300 select-none flex items-center space-x-1"
              onClick={() => setActiveDomain(isActive ? null : domain)}
            >
              <span className={`transform transition-transform ${isActive ? "rotate-90" : ""}`}>
                ▶
              </span>
              <span className="font-bold">{domain}</span>
            </div>

            {isActive && (
              <div className="ml-6 mt-1 space-y-2">
                {domainChallenges.map((ch) => {
                  const solved = ch.solves.some((s) => s.user === currentUser);
                  return (
                    <div
                      key={ch.id}
                      className={`challenge-card matrix-text ${
                        ch.paused ? "opacity-50" : ""
                      } ${solved ? "border-green-700 text-green-700" : ""}`}
                      onClick={() => !ch.paused && onChallengeClick(ch)}
                    >
                      <div>
                        <span>{ch.name}</span>
                        {ch.paused && <span className="text-yellow-400 text-sm ml-2">(Under Maintenance)</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
