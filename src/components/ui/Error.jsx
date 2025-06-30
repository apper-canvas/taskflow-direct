import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, type = 'general' }) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff'
      case 'tasks':
        return 'AlertTriangle'
      case 'search':
        return 'SearchX'
      default:
        return 'AlertCircle'
    }
  }

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error'
      case 'tasks':
        return 'Unable to Load Tasks'
      case 'search':
        return 'Search Failed'
      default:
        return 'Something Went Wrong'
    }
  }

  const getErrorDescription = () => {
    switch (type) {
      case 'network':
        return 'Please check your internet connection and try again.'
      case 'tasks':
        return 'We could not load your tasks. Please try refreshing the page.'
      case 'search':
        return 'Unable to search tasks at the moment. Please try again.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

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
        className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon 
          name={getErrorIcon()} 
          size={32} 
          className="text-red-600"
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold text-gray-900 mb-2 font-display"
      >
        {getErrorTitle()}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 mb-2 max-w-md"
      >
        {getErrorDescription()}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-500 mb-8"
      >
        {message}
      </motion.p>

      {onRetry && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={onRetry}
          className="button-primary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" size={18} />
<span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error