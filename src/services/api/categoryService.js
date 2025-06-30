import mockCategories from '@/services/mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = [...mockCategories]
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(category => category.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }

  async create(categoryData) {
    await this.delay()
    
    const newCategory = {
      ...categoryData,
      Id: this.getNextId(),
      taskCount: 0
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, categoryData) {
    await this.delay()
    
    const index = this.categories.findIndex(category => category.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories[index] = { ...this.categories[index], ...categoryData }
    return { ...this.categories[index] }
  }

  async delete(id) {
    await this.delay()
    
    const index = this.categories.findIndex(category => category.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories.splice(index, 1)
    return true
  }

  getNextId() {
    return Math.max(...this.categories.map(category => category.Id), 0) + 1
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }
}

export const categoryService = new CategoryService()