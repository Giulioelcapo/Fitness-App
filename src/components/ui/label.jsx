import React from "react";

export function Label({ className = "", children }) {
  return <label className={`block text-sm font-medium text-white ${className}`}>{children}</label>;
}