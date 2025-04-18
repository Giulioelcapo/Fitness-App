import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-xl bg-[#2a2d34] text-white border border-[#444] ${className}`}
      {...props}
    />
  );
}