import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hello! Welcome to our educational platform. I\'m here to assist you with any questions about our courses, admissions, or services.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    { text: '📚 View Courses', icon: '📚' },
    { text: '💰 Pricing Info', icon: '💰' },
    { text: '👨‍🎓 Talk to Counselor', icon: '👨‍🎓' },
    { text: '🎯 Placement Support', icon: '🎯' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleQuickReply = (reply) => {
    handleSendMessage(reply.text);
  };

  const handleSendMessage = (text = message) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = '';
      const lowerText = text.toLowerCase();

      if (lowerText.includes('course') || lowerText.includes('📚')) {
        botResponse = '🎓 We offer comprehensive programs in:\n\n• Data Science & AI\n• Digital Marketing\n• Full Stack Development\n• Financial Analytics\n• Business Management\n\nWould you like detailed information about any specific course?';
      } else if (lowerText.includes('price') || lowerText.includes('pricing') || lowerText.includes('💰')) {
        botResponse = '💳 Our course fees are competitive and offer great value:\n\n• Most programs: ₹49,999 - ₹99,999\n• EMI options available\n• Scholarships for eligible students\n\nWould you like a detailed fee breakdown for a specific program?';
      } else if (lowerText.includes('counselor') || lowerText.includes('talk') || lowerText.includes('👨‍🎓')) {
        botResponse = '📞 I\'d be delighted to connect you with our expert counselors!\n\nPlease share:\n• Your name\n• Contact number\n• Preferred course\n\nOur team will reach out within 2 hours during business hours.';
      } else if (lowerText.includes('placement') || lowerText.includes('🎯')) {
        botResponse = '🎯 Our Placement Highlights:\n\n✅ 95% placement rate\n✅ 500+ hiring partners\n✅ ₹8L+ average package\n✅ Dedicated placement team\n✅ Interview preparation\n✅ Resume building support\n\nWe ensure your career success!';
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botResponse = '👋 Hello! Great to hear from you! How can I assist you today? Feel free to ask about courses, admissions, fees, or placements.';
      } else if (lowerText.includes('thank')) {
        botResponse = '😊 You\'re welcome! Is there anything else I can help you with today?';
      } else {
        botResponse = '💬 Thank you for your message! Our support team is here to help.\n\nYou can also:\n• Email: support@example.com\n• Call: +91-XXXXXXXXXX\n• Visit our campus\n\nHow else can I assist you?';
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with us! 💬
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 'auto'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                      <Bot className="w-6 h-6" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Support Assistant</h3>
                    <p className="text-xs text-blue-100 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online • Typically replies instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            {!isMinimized && (
              <>
                <div className="h-[450px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                          msg.type === 'bot' 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                            : 'bg-gradient-to-br from-gray-600 to-gray-700'
                        }`}>
                          {msg.type === 'bot' ? (
                            <Bot className="w-4 h-4 text-white" />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1 max-w-[75%]">
                          <div className={`p-3 rounded-2xl shadow-sm ${
                            msg.type === 'bot' 
                              ? 'bg-white border border-gray-200 rounded-tl-none' 
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                          </div>
                          <span className={`text-xs text-gray-400 px-2 ${msg.type === 'user' ? 'text-right' : ''}`}>
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Quick Replies */}
                    {messages.length === 1 && !isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="ml-11 space-y-2"
                      >
                        <p className="text-xs text-gray-500 font-medium mb-2">Quick replies:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {quickReplies.map((reply, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-2 bg-white border-2 border-blue-200 text-blue-700 rounded-xl text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm text-left"
                            >
                              {reply.text}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!message.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Powered by AI • Available 24/7
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
