import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const MessageBubble = ({ message }) => {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
      <div className={`flex space-x-3 max-w-3xl ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isAssistant ? 'bg-primary-100 text-primary-700' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </div>

        {/* Message content */}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAssistant
              ? 'bg-white border border-gray-200 text-gray-800'
              : 'bg-primary-600 text-white'
          }`}
        >
          <div className="prose prose-sm max-w-none">
            {isAssistant ? (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
          <div className={`text-xs mt-2 ${isAssistant ? 'text-gray-500' : 'text-primary-100'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
