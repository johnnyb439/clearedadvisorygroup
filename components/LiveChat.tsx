'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help with your cleared career questions. How can I assist you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  // Auto-open chat after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true)
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('clearance') && msg.includes('how')) {
      return "Getting a security clearance typically involves employer sponsorship. We help connect you with companies that sponsor clearances. Would you like to see current opportunities?"
    } else if (msg.includes('job') || msg.includes('work')) {
      return "We specialize in IT positions requiring clearances. Common roles include Help Desk, Network Admin, and Systems Admin. What type of role interests you?"
    } else if (msg.includes('salary') || msg.includes('pay')) {
      return "Cleared IT professionals typically earn 15-30% more than non-cleared. Exact salary depends on location, clearance level, and experience. Would you like a detailed consultation?"
    } else if (msg.includes('interview')) {
      return "Great! We have an AI-powered mock interview tool. You can practice common IT interview questions and get instant feedback. Would you like to try it?"
    } else if (msg.includes('resume')) {
      return "We offer resume translation services to convert military experience into civilian IT terms. This is crucial for getting past ATS systems. Interested in learning more?"
    } else {
      return "I'd be happy to help! You can ask about clearances, IT careers, interview prep, or schedule a consultation with our human advisors. What would you like to know?"
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-dynamic-green text-white p-4 rounded-full shadow-lg hover:bg-emerald-green transition-colors z-40"
          >
            <MessageCircle size={24} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Career Advisor Chat</h3>
                <p className="text-xs opacity-90">Typically replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-dynamic-blue text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-dynamic-green"
                />
                <button
                  type="submit"
                  className="bg-dynamic-green text-white p-2 rounded-lg hover:bg-emerald-green transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                By chatting, you agree to our privacy policy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}