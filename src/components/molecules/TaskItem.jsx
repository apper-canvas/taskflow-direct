import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast, isTomorrow } from 'date-fns'
import { toast } from 'react-toastify'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskItem = ({ task, category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
const [editTitle, setEditTitle] = useState(task.Name || task.title)

  const handleToggleComplete = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : null
    }
    onUpdate(updatedTask)
    toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed! 🎉')
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      toast.error('Task title cannot be empty')
      return
    }
    
    onUpdate({ ...task, Name: editTitle.trim(), title: editTitle.trim() })
    setIsEditing(false)
    toast.success('Task updated')
  }

const handleCancelEdit = () => {
    setEditTitle(task.Name || task.title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(task.Id)
    toast.success('Task deleted')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'variant-high'
      case 'medium': return 'variant-medium'
      case 'low': return 'variant-low'
      default: return 'variant-secondary'
    }
  }

const getDueDateDisplay = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    if (isToday(date)) return { text: 'Today', color: 'text-blue-600', urgent: true }
    if (isTomorrow(date)) return { text: 'Tomorrow', color: 'text-orange-600', urgent: false }
    if (isPast(date)) return { text: 'Overdue', color: 'text-red-600', urgent: true }
    
    return { text: format(date, 'MMM d'), color: 'text-gray-600', urgent: false }
  }

  const dueDateInfo = getDueDateDisplay(task.due_date || task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`task-card p-6 ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center space-x-4">
        <motion.button
          onClick={handleToggleComplete}
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200 flex-shrink-0
            ${task.completed 
              ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-500' 
              : 'border-gray-300 hover:border-primary-500'
            }
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="animate-bounce-in"
              >
                <ApperIcon name="Check" size={14} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
                autoFocus
              />
              <Button size="sm" onClick={handleSaveEdit} icon="Check" />
              <Button size="sm" variant="ghost" onClick={handleCancelEdit} icon="X" />
            </div>
          ) : (
            <div>
<h3 
                className={`font-medium text-gray-900 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.Name || task.title}
              </h3>
              
              <div className="flex items-center space-x-3 mt-2">
                <Badge variant={task.priority} size="sm">
                  {task.priority} priority
                </Badge>
                
                {category && (
                  <Badge variant="secondary" size="sm" icon="Folder">
                    {category.name}
                  </Badge>
                )}
                
                {dueDateInfo && (
                  <Badge 
                    variant={dueDateInfo.urgent ? 'danger' : 'secondary'} 
                    size="sm" 
                    icon="Calendar"
                    pulse={dueDateInfo.urgent}
                  >
                    {dueDateInfo.text}
                  </Badge>
                )}
                
<span className="text-xs text-gray-400">
                  {format(new Date(task.created_at || task.createdAt), 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            icon="Edit2"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Button
            size="sm"
            variant="ghost"
            icon="Trash2"
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem