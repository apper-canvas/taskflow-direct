import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks || 0,
      icon: 'CheckSquare',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Completed Today',
      value: stats.completedToday || 0,
      icon: 'CheckCircle',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'This Week',
      value: stats.completedThisWeek || 0,
      icon: 'Calendar',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak || 0} days`,
      icon: 'Flame',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 font-display">
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <ApperIcon 
                name={stat.icon} 
                size={24} 
                className={stat.textColor}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className={`w-full h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-20`} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsOverview