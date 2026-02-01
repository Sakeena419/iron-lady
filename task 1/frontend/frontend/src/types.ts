export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface QuickQuestion {
  id: string
  question: string
  category: string
}

export interface ChatResponse {
  message: string
  suggestions?: string[]
}
