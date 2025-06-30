import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'All Tasks'
    if (path.startsWith('/category/')) return 'Category Tasks'
    if (path.startsWith('/priority/')) return 'Priority Tasks'
    return 'TaskFlow'
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    // You can implement search functionality here
    // For now, this is a placeholder
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <Button variant="ghost" icon="Menu" size="sm" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Stay organized and get things done
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-96">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" icon="Bell" size="sm" />
            <Button variant="ghost" icon="Settings" size="sm" />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <SearchBar onSearch={handleSearch} />
      </div>
    </motion.header>
  )
}

export default Header