import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, isPast } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) return 'Today'
  if (isTomorrow(dateObj)) return 'Tomorrow'
  if (isYesterday(dateObj)) return 'Yesterday'
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export const isOverdue = (date) => {
  if (!date) return false
  return isPast(new Date(date)) && !isToday(new Date(date))
}

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return null
  
  const date = new Date(dueDate)
  
  if (isOverdue(dueDate)) {
    return { status: 'overdue', color: 'red', urgent: true }
  }
  
  if (isToday(date)) {
    return { status: 'today', color: 'blue', urgent: true }
  }
  
  if (isTomorrow(date)) {
    return { status: 'tomorrow', color: 'orange', urgent: false }
  }
  
  return { status: 'upcoming', color: 'gray', urgent: false }
}