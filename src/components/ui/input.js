import React from 'react'

export function Input({ type, placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    />
  )
}