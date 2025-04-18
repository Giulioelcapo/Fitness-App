import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}