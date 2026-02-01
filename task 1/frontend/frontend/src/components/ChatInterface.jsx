import { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { chatApi } from '../api/chatApi'

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to Iron Lady! 🔥 I'm here to help you break through career plateaus, embrace unapologetic ambition, and join our 78,000+ Women Leaders' Ecosystem. Are you ready to WIN? What breakthrough are you seeking - C-suite advancement, business growth, or mindset transformation?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const conversationIdRef = useRef()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chatApi.sendMessage(input, conversationIdRef.current)
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Don't let this stop you! Call us directly at +91-6360823123 or try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Iron Lady Assistant</h1>
            <p className="text-sm text-primary-100">Elevating Women to the TOP 🚀</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickQuestion('How can I reach C-suite level?')}
            className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
          >
            How can I reach C-suite level?
          </button>
          <button
            onClick={() => handleQuickQuestion('Tell me about Business War Tactics')}
            className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
          >
            Tell me about Business War Tactics
          </button>
          <button
            onClick={() => handleQuickQuestion("I'm stuck in my career, help!")}
            className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
          >
            I'm stuck in my career, help!
          </button>
          <button
            onClick={() => handleQuickQuestion('How do I develop a winning mindset?')}
            className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
          >
            How do I develop a winning mindset?
          </button>
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInterface
