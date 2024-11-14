import React from 'react'

export function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </select>
  )
}