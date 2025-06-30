import { taskService } from './taskService'

class StatsService {
  async getStats() {
    await this.delay()
    
    const tasks = await taskService.getAll()
    const today = new Date()
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
    
    const completedToday = tasks.filter(task => {
      if (!task.completed || !task.completedAt) return false
      const completedDate = new Date(task.completedAt)
      return completedDate.toDateString() === today.toDateString()
    }).length

    const completedThisWeek = tasks.filter(task => {
      if (!task.completed || !task.completedAt) return false
      const completedDate = new Date(task.completedAt)
      return completedDate >= startOfWeek
    }).length

    // Calculate streak (simplified - consecutive days with completed tasks)
    let currentStreak = 0
    const sortedCompletedDates = tasks
      .filter(task => task.completed && task.completedAt)
      .map(task => new Date(task.completedAt).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort((a, b) => new Date(b) - new Date(a))

    if (sortedCompletedDates.length > 0) {
      let checkDate = new Date()
      for (const dateStr of sortedCompletedDates) {
        if (dateStr === checkDate.toDateString()) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    return {
      totalTasks: tasks.length,
      completedToday,
      completedThisWeek,
      currentStreak
    }
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
  }
}

export const statsService = new StatsService()