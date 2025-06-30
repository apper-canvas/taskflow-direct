import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from '@/components/molecules/TaskItem'
import Empty from '@/components/ui/Empty'

const TaskList = ({ tasks, categories, onUpdateTask, onDeleteTask, searchQuery = '' }) => {
  if (tasks.length === 0) {
    if (searchQuery) {
      return <Empty type="search" searchQuery={searchQuery} />
    }
    return <Empty type="tasks" />
  }

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <TaskItem
              task={task}
              category={getCategoryById(task.categoryId)}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList