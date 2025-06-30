import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import TaskInput from '@/components/molecules/TaskInput'
import TaskList from '@/components/organisms/TaskList'
import StatsOverview from '@/components/organisms/StatsOverview'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import { statsService } from '@/services/api/statsService'

const TasksDashboard = () => {
  const { categoryId, priority } = useParams()
  const location = useLocation()
  
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [categoryId, priority, location.pathname])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [tasksData, categoriesData, statsData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll(),
        statsService.getStats()
      ])

      let filteredTasks = tasksData

      // Apply filters based on route
      if (location.pathname === '/active') {
        filteredTasks = tasksData.filter(task => !task.completed)
      } else if (location.pathname === '/completed') {
        filteredTasks = tasksData.filter(task => task.completed)
      } else if (location.pathname === '/overdue') {
        filteredTasks = tasksData.filter(task => 
          task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
        )
      } else if (categoryId) {
        filteredTasks = tasksData.filter(task => task.categoryId === parseInt(categoryId))
      } else if (priority) {
        filteredTasks = tasksData.filter(task => task.priority === priority)
      }

      // Sort tasks by priority and creation date
      filteredTasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setTasks(filteredTasks)
      setCategories(categoriesData)
      setStats(statsData)
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      loadData() // Reload to get fresh data
    } catch (err) {
      toast.error('Failed to add task')
    }
  }

  const handleUpdateTask = async (updatedTask) => {
    try {
      await taskService.update(updatedTask.Id, updatedTask)
      loadData() // Reload to get fresh data
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      loadData() // Reload to get fresh data
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  if (loading) {
    return <Loading type="dashboard" />
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadData}
        type="tasks"
      />
    )
  }

  const shouldShowStats = location.pathname === '/' || location.pathname === '/active'
  const selectedCategoryId = categoryId ? parseInt(categoryId) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {shouldShowStats && <StatsOverview stats={stats} />}
      
      <TaskInput 
        onAddTask={handleAddTask}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
      />
      
      <TaskList
        tasks={tasks}
        categories={categories}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </motion.div>
  )
}

export default TasksDashboard