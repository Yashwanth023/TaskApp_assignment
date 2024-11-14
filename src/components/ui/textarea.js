import React from 'react'

export function Textarea({ placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  )
}