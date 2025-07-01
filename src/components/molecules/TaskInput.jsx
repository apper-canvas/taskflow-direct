import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskInput = ({ onAddTask, categories, selectedCategoryId }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [categoryId, setCategoryId] = useState(selectedCategoryId || '')
  const [dueDate, setDueDate] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('Please enter a task title')
      return
    }

const newTask = {
      Name: title.trim(),
      title: title.trim(),
      priority,
      category_id: categoryId || null,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
      completed: false,
      created_at: new Date().toISOString(),
      completed_at: null
    }

    onAddTask(newTask)
    
    // Reset form
    setTitle('')
    setPriority('medium')
    setCategoryId(selectedCategoryId || '')
    setDueDate('')
    setIsExpanded(false)
    
    toast.success('Task added successfully!')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-150 text-lg"
            />
          </div>
          
          <Button
            type="submit"
            icon="Plus"
            className="px-6 py-3"
            disabled={!title.trim()}
          >
            Add Task
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 transition-all duration-150"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 transition-all duration-150"
              >
                <option value="">No Category</option>
                {categories.map(category => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 transition-all duration-150"
              />
            </div>
          </motion.div>
        )}

        {isExpanded && (
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="mr-3"
            >
              Collapse
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  )
}

export default TaskInput