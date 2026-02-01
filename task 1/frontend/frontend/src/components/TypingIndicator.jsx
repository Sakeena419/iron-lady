import { Bot } from 'lucide-react'

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex space-x-3 max-w-3xl">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
          <Bot size={20} />
        </div>
        <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
