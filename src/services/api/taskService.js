class TaskService {
  constructor() {
    this.apperClient = null
    this.initializeClient()
  }

  initializeClient() {
    if (window.ApperSDK) {
      const { ApperClient } = window.ApperSDK
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "completed" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        orderBy: [
          { fieldName: "created_at", sorttype: "DESC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('task', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return []
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "completed" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('task', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async create(taskData) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const params = {
        records: [{
          Name: taskData.Name || taskData.title,
          title: taskData.title,
          completed: taskData.completed || false,
          priority: taskData.priority,
          due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
          created_at: new Date().toISOString(),
          completed_at: taskData.completedAt ? new Date(taskData.completedAt).toISOString() : null,
          category_id: taskData.categoryId ? parseInt(taskData.categoryId) : null,
          Tags: taskData.Tags || "",
          Owner: taskData.Owner || null
        }]
      }
      
      const response = await this.apperClient.createRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return result.data
        } else {
          console.error(`Failed to create task:${JSON.stringify([result])}`)
          return null
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async update(id, taskData) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const updateData = {
        Id: parseInt(id)
      }
      
      if (taskData.Name !== undefined) updateData.Name = taskData.Name
      if (taskData.title !== undefined) updateData.title = taskData.title
      if (taskData.completed !== undefined) updateData.completed = taskData.completed
      if (taskData.priority !== undefined) updateData.priority = taskData.priority
      if (taskData.due_date !== undefined) updateData.due_date = taskData.due_date
      if (taskData.completed_at !== undefined) updateData.completed_at = taskData.completed_at ? new Date(taskData.completed_at).toISOString() : null
      if (taskData.category_id !== undefined) updateData.category_id = taskData.category_id ? parseInt(taskData.category_id) : null
      if (taskData.Tags !== undefined) updateData.Tags = taskData.Tags
      if (taskData.Owner !== undefined) updateData.Owner = taskData.Owner
      
      const params = {
        records: [updateData]
      }
      
      const response = await this.apperClient.updateRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return result.data
        } else {
          console.error(`Failed to update task:${JSON.stringify([result])}`)
          return null
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await this.apperClient.deleteRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        return false
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return true
        } else {
          console.error(`Failed to delete task:${JSON.stringify([result])}`)
          return false
        }
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}

export const taskService = new TaskService()