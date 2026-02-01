import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const chatApi = {
  sendMessage: async (message, conversationId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message,
        conversation_id: conversationId,
      })
      return response.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  },

  getQuickQuestions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/quick-questions`)
      return response.data.questions
    } catch (error) {
      console.error('Error fetching quick questions:', error)
      return []
    }
  },
}
