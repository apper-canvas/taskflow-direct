export const sortTasks = (tasks, sortBy = 'priority') => {
  const sortedTasks = [...tasks]
  
  switch (sortBy) {
    case 'priority':
      return sortedTasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    
    case 'dueDate':
      return sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    
    case 'created':
      return sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    case 'alphabetical':
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title))
    
    default:
      return sortedTasks
  }
}

export const filterTasks = (tasks, filters) => {
  let filteredTasks = [...tasks]
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.priority && filters.priority.length > 0) {
    filteredTasks = filteredTasks.filter(task =>
      filters.priority.includes(task.priority)
    )
  }
  
  if (filters.categoryId) {
    filteredTasks = filteredTasks.filter(task =>
      task.categoryId === filters.categoryId
    )
  }
  
  if (filters.completed !== undefined) {
    filteredTasks = filteredTasks.filter(task =>
      task.completed === filters.completed
    )
  }
  
  if (filters.overdue) {
    filteredTasks = filteredTasks.filter(task =>
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    )
  }
  
  return filteredTasks
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const overdue = tasks.filter(task =>
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  ).length
  
  const byPriority = {
    high: tasks.filter(task => task.priority === 'high' && !task.completed).length,
    medium: tasks.filter(task => task.priority === 'medium' && !task.completed).length,
    low: tasks.filter(task => task.priority === 'low' && !task.completed).length
  }
  
  return {
    total,
    completed,
    pending,
    overdue,
    byPriority,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}