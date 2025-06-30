import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'tasks' }) => {
  const renderTasksSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="task-card p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="flex items-center space-x-3">
                <div className="w-16 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-24 h-3 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderStatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {type === 'tasks' && renderTasksSkeleton()}
      {type === 'stats' && renderStatsSkeleton()}
      {type === 'dashboard' && (
        <div className="space-y-8">
          {renderStatsSkeleton()}
          {renderTasksSkeleton()}
        </div>
      )}
    </div>
  )
}

export default Loading