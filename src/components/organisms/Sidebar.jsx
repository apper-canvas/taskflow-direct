import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'

const Sidebar = () => {
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ])
      
      setCategories(categoriesData)
      
      // Calculate task counts
      const counts = {
        all: tasksData.length,
        active: tasksData.filter(task => !task.completed).length,
        completed: tasksData.filter(task => task.completed).length,
        high: tasksData.filter(task => task.priority === 'high' && !task.completed).length,
        medium: tasksData.filter(task => task.priority === 'medium' && !task.completed).length,
        low: tasksData.filter(task => task.priority === 'low' && !task.completed).length,
        overdue: tasksData.filter(task => 
          task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
        ).length
      }
      
      // Category counts
      categoriesData.forEach(category => {
        counts[`category-${category.Id}`] = tasksData.filter(
          task => task.categoryId === category.Id && !task.completed
        ).length
      })
      
      setTaskCounts(counts)
    } catch (error) {
      console.error('Failed to load sidebar data:', error)
    }
  }

  const navItems = [
    { icon: 'Inbox', label: 'All Tasks', path: '/', count: taskCounts.all },
    { icon: 'Circle', label: 'Active', path: '/active', count: taskCounts.active },
    { icon: 'CheckCircle', label: 'Completed', path: '/completed', count: taskCounts.completed },
    { icon: 'Clock', label: 'Overdue', path: '/overdue', count: taskCounts.overdue, urgent: true },
  ]

  const priorityItems = [
    { icon: 'AlertCircle', label: 'High Priority', path: '/priority/high', count: taskCounts.high, color: 'text-red-600' },
    { icon: 'Minus', label: 'Medium Priority', path: '/priority/medium', count: taskCounts.medium, color: 'text-yellow-600' },
    { icon: 'ArrowDown', label: 'Low Priority', path: '/priority/low', count: taskCounts.low, color: 'text-green-600' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">TaskFlow</h2>
            <p className="text-xs text-gray-500">Organize & Complete</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Overview
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={item.icon} 
                    size={18} 
                    className={item.urgent ? 'text-red-500' : ''} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <Badge 
                    variant={item.urgent ? 'danger' : 'secondary'} 
                    size="sm"
                    pulse={item.urgent}
                  >
                    {item.count}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Priority Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Priority
          </h3>
          <nav className="space-y-1">
            {priorityItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={item.icon} 
                    size={18} 
                    className={item.color} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <Badge variant="secondary" size="sm">
                    {item.count}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            <button 
              onClick={() => navigate('/categories')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="Plus" size={16} />
            </button>
          </div>
          <nav className="space-y-1">
            {categories.map((category) => (
              <NavLink
                key={category.Id}
                to={`/category/${category.Id}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="truncate">{category.name}</span>
                </div>
                {taskCounts[`category-${category.Id}`] > 0 && (
                  <Badge variant="secondary" size="sm">
                    {taskCounts[`category-${category.Id}`]}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <ApperIcon name="Target" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Daily Goal</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary-600">
              {taskCounts.completed || 0} / 10 tasks
            </span>
            <div className="w-20 h-2 bg-primary-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${Math.min(((taskCounts.completed || 0) / 10) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar