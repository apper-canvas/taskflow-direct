import mockTasks from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

  async create(taskData) {
    await this.delay()
    
    const newTask = {
      ...taskData,
      Id: this.getNextId(),
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, taskData) {
    await this.delay()
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = { ...this.tasks[index], ...taskData }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await this.delay()
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }

  getNextId() {
    return Math.max(...this.tasks.map(task => task.Id), 0) + 1
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }
}

export const taskService = new TaskService()