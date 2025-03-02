import { useState, useEffect } from "react";

export default function Alert({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-4 font-bold">
        X
      </button>
    </div>
  );
}
