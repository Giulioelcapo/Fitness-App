import React from "react";

export function Select({ children, onValueChange }) {
  return (
    <select
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl bg-[#2a2d34] text-white border border-[#444]"
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectValue({ placeholder }) {
  return <option disabled selected>{placeholder}</option>;
}