import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ type = 'tasks', onAction, searchQuery = '' }) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'tasks':
        return {
          icon: 'CheckSquare',
          title: 'No tasks yet',
          description: 'Create your first task to get started on your productive journey.',
          actionText: 'Add Your First Task',
          gradient: 'from-primary-100 to-primary-200',
          iconColor: 'text-primary-600'
        }
      case 'search':
        return {
          icon: 'Search',
          title: `No results found for "${searchQuery}"`,
          description: 'Try adjusting your search terms or browse all tasks.',
          actionText: 'Clear Search',
          gradient: 'from-gray-100 to-gray-200',
          iconColor: 'text-gray-600'
        }
      case 'completed':
        return {
          icon: 'Target',
          title: 'No completed tasks yet',
          description: 'Complete some tasks to see your achievements here.',
          actionText: 'View All Tasks',
          gradient: 'from-green-100 to-green-200',
          iconColor: 'text-green-600'
        }
      case 'category':
        return {
          icon: 'Folder',
          title: 'No tasks in this category',
          description: 'Start organizing by adding tasks to this category.',
          actionText: 'Add Task to Category',
          gradient: 'from-blue-100 to-blue-200',
          iconColor: 'text-blue-600'
        }
      case 'overdue':
        return {
          icon: 'Clock',
          title: 'No overdue tasks',
          description: 'Great job staying on top of your deadlines!',
          actionText: 'View All Tasks',
          gradient: 'from-amber-100 to-amber-200',
          iconColor: 'text-amber-600'
        }
      default:
        return {
          icon: 'Inbox',
          title: 'Nothing here yet',
          description: 'Start by adding some content.',
          actionText: 'Get Started',
          gradient: 'from-gray-100 to-gray-200',
          iconColor: 'text-gray-600'
        }
    }
  }

  const config = getEmptyConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className={`w-24 h-24 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center mb-8`}
      >
        <ApperIcon 
          name={config.icon} 
          size={40} 
          className={config.iconColor}
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-gray-900 mb-3 font-display"
      >
        {config.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        {config.description}
      </motion.p>

      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onAction}
          className="button-primary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={18} />
          <span>{config.actionText}</span>
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-gray-400"
      >
        <ApperIcon name="Sparkles" size={16} className="inline mr-1" />
        Tip: Use keyboard shortcuts to work faster
      </motion.div>
    </motion.div>
  )
}

export default Empty