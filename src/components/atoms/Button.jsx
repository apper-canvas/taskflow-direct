import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'button-primary'
      case 'secondary':
        return 'button-secondary'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-150 transform hover:scale-105 shadow-sm hover:shadow-md'
      case 'ghost':
        return 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium px-3 py-2 rounded-lg transition-all duration-150'
      case 'link':
        return 'text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline'
      default:
        return 'button-primary'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'md':
        return 'px-4 py-2 text-base'
      case 'lg':
        return 'px-6 py-3 text-lg'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    ${getVariantClasses()}
    ${variant !== 'link' ? getSizeClasses() : ''}
    ${className}
  `

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSize} 
          className="mr-2 animate-spin" 
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="mr-2" 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="ml-2" 
        />
      )}
    </motion.button>
  )
}

export default Button