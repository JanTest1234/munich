import React from 'react'

// Minimal stand-in for shadcn/ui Badge
export function Badge({ className = "", children }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold " +
        className
      }
    >
      {children}
    </span>
  );
}