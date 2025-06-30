import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  pulse = false,
  className = '',
  onClick,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'high':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-200'
      case 'medium':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-200'
      case 'primary':
        return 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border-primary-200'
      case 'secondary':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-200'
      case 'success':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-200'
      case 'warning':
        return 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-200'
      case 'danger':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-200'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-200'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs'
      case 'md':
        return 'px-2.5 py-1 text-sm'
      case 'lg':
        return 'px-3 py-1.5 text-base'
      default:
        return 'px-2.5 py-1 text-sm'
    }
  }

  const baseClasses = `
    inline-flex items-center font-medium rounded-full border
    transition-all duration-150
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${onClick ? 'cursor-pointer hover:scale-105' : ''}
    ${pulse ? 'animate-pulse-soft' : ''}
    ${className}
  `

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14

  const content = (
    <>
      {icon && (
        <ApperIcon 
          name={icon} 
          size={iconSize} 
          className="mr-1" 
        />
      )}
      {children}
    </>
  )

  if (onClick) {
    return (
      <motion.button
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <span className={baseClasses} {...props}>
      {content}
    </span>
  )
}

export default Badge