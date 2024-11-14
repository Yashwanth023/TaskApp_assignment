import React from 'react'
import { motion } from 'framer-motion'

export function Button({ children, onClick, className, variant, size }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded transition-colors ${
        variant === 'ghost'
          ? 'hover:bg-gray-100'
          : 'bg-indigo-500 text-white hover:bg-indigo-600'
      } ${size === 'icon' ? 'p-2' : ''} ${className}`}
    >
      {children}
    </motion.button>
  )
}