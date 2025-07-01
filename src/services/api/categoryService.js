class CategoryService {
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
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('category', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message)  
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
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('category', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async create(categoryData) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const params = {
        records: [{
          Name: categoryData.Name || categoryData.name,
          color: categoryData.color,
          task_count: categoryData.task_count || 0,
          Tags: categoryData.Tags || "",
          Owner: categoryData.Owner || null
        }]
      }
      
      const response = await this.apperClient.createRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return result.data
        } else {
          console.error(`Failed to create category:${JSON.stringify([result])}`)
          return null
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async update(id, categoryData) {
    try {
      if (!this.apperClient) this.initializeClient()
      
      const updateData = {
        Id: parseInt(id)
      }
      
      if (categoryData.Name !== undefined) updateData.Name = categoryData.Name
      if (categoryData.name !== undefined) updateData.Name = categoryData.name
      if (categoryData.color !== undefined) updateData.color = categoryData.color
      if (categoryData.task_count !== undefined) updateData.task_count = categoryData.task_count
      if (categoryData.Tags !== undefined) updateData.Tags = categoryData.Tags
      if (categoryData.Owner !== undefined) updateData.Owner = categoryData.Owner
      
      const params = {
        records: [updateData]
      }
      
      const response = await this.apperClient.updateRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return result.data
        } else {
          console.error(`Failed to update category:${JSON.stringify([result])}`)
          return null
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message)  
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
      
      const response = await this.apperClient.deleteRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        return false
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0]
        if (result.success) {
          return true
        } else {
          console.error(`Failed to delete category:${JSON.stringify([result])}`)
          return false
        }
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message)  
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}

export const categoryService = new CategoryService()