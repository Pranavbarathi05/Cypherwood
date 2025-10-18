// src/components/HintModal.jsx
import React from "react";

export default function HintModal({ hint, onClose, onConfirm }) {
  if (!hint) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="border border-green-700 bg-black text-green-400 p-6 rounded-lg w-1/2 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-300">Hint</h2>
        <p className="mb-4">
          Viewing this hint will cost{" "}
          <span className="text-yellow-400 font-bold">{hint.cost}</span> points.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="border border-green-700 px-4 py-2 hover:bg-green-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(hint);
              onClose();
            }}
            className="bg-green-700 hover:bg-green-600 text-black font-bold px-4 py-2 rounded"
          >
            View Hint
          </button>
        </div>

        <div className="mt-4 border-t border-green-800 pt-3">
          <p className="italic text-green-300">{hint.text}</p>
        </div>
      </div>
    </div>
  );
}
