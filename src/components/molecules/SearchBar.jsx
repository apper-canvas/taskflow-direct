import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, onSearch])

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="Search" 
            size={18} 
            className={`transition-colors duration-150 ${
              isFocused ? 'text-primary-500' : 'text-gray-400'
            }`}
          />
        </div>
        
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 
            focus:border-primary-500 focus:ring-2 focus:ring-primary-100 
            transition-all duration-150 bg-white shadow-sm
            ${isFocused ? 'shadow-md' : ''}
          `}
        />
        
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <ApperIcon name="X" size={18} />
          </motion.button>
        )}
      </div>
      
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
        >
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Info" size={14} className="mr-2" />
            Searching for "{searchTerm}"...
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SearchBar