import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Heart,
  Target,
  Zap,
  Mic,
  MicOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { ChatMessage } from '../../types';

const AICoach: React.FC = () => {
  const { user } = useAuth();
  const { chatMessages, addChatMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Add welcome message if no messages exist
    if (chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: `Hello ${user?.name || 'there'}! 👋 I'm your AI fitness coach. I'm here to help you with workout plans, nutrition advice, motivation, and answer any health-related questions you might have. What would you like to talk about today?`,
        isUser: false,
        timestamp: new Date()
      };
      addChatMessage(welcomeMessage);
    }
  }, [chatMessages.length, user?.name, addChatMessage]);

  const quickPrompts = [
    {
      icon: Target,
      text: "Create a workout plan for me",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Heart,
      text: "How to stay motivated?",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      text: "Nutrition tips for my goals",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Lightbulb,
      text: "Quick healthy recipe ideas",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('workout') || message.includes('exercise')) {
      return `Based on your fitness goal of ${user?.fitnessGoal?.replace('_', ' ')}, I recommend focusing on a balanced routine. Here's what I suggest:

1. **Strength Training** (3x/week): Focus on compound movements like squats, deadlifts, and push-ups
2. **Cardio** (2-3x/week): Mix high-intensity intervals with steady-state cardio
3. **Flexibility** (daily): 10-15 minutes of stretching or yoga

Start with 3-4 exercises per session, 3 sets of 8-12 reps. Remember to warm up before and cool down after each workout. Would you like me to create a specific plan for today?`;
    }
    
    if (message.includes('motivation') || message.includes('motivated')) {
      return `I understand staying motivated can be challenging! Here are some proven strategies:

💪 **Set Small, Achievable Goals**: Break your big goal into weekly milestones
🏆 **Track Your Progress**: Celebrate small wins along the way
👥 **Find an Accountability Partner**: Share your journey with someone
🎵 **Create an Energizing Playlist**: Music can boost your workout performance
📱 **Use Visual Reminders**: Set your workout clothes out the night before

Remember, motivation gets you started, but habit keeps you going. You've already taken the first step by being here! What's your biggest motivation challenge right now?`;
    }
    
    if (message.includes('nutrition') || message.includes('diet') || message.includes('food')) {
      return `Great question about nutrition! Based on your dietary preference (${user?.dietaryPreference}), here are some key recommendations:

🥗 **Balanced Meals**: Include protein, complex carbs, healthy fats, and vegetables
⏰ **Timing**: Eat every 3-4 hours to maintain energy levels
💧 **Hydration**: Aim for 8-10 glasses of water daily
🍎 **Whole Foods**: Choose minimally processed options when possible

For your goal of ${user?.fitnessGoal?.replace('_', ' ')}, focus on:
- Adequate protein (0.8-1g per kg body weight)
- Pre-workout: Light carbs for energy
- Post-workout: Protein and carbs for recovery

Would you like specific meal ideas or help planning your daily nutrition?`;
    }
    
    if (message.includes('recipe') || message.includes('meal')) {
      return `Here are some quick, healthy recipe ideas perfect for your lifestyle:

🌅 **Breakfast**: Overnight oats with berries and nuts
🥙 **Lunch**: Greek yogurt bowl with vegetables and hummus
🍽️ **Dinner**: Grilled chicken/fish with roasted vegetables
🥤 **Snack**: Apple slices with almond butter

**5-Minute Meals:**
- Veggie-packed smoothie
- Avocado toast with egg
- Greek yogurt parfait
- Protein-rich salad wrap

All of these align with your ${user?.dietaryPreference} dietary preference. Would you like the detailed recipe for any of these?`;
    }
    
    if (message.includes('weight') || message.includes('lose') || message.includes('gain')) {
      return `Weight management is about creating sustainable habits. Here's a balanced approach:

📊 **Track Consistently**: Monitor your progress weekly, not daily
🏃‍♀️ **Combine Cardio + Strength**: Both are important for body composition
🍽️ **Portion Control**: Use smaller plates, eat slowly, listen to hunger cues
😴 **Quality Sleep**: 7-9 hours supports healthy metabolism
🧘‍♀️ **Manage Stress**: High stress can impact weight management

For your goal of ${user?.fitnessGoal?.replace('_', ' ')}, focus on:
- Creating a moderate calorie deficit/surplus
- Prioritizing whole foods
- Staying consistent with your routine

Remember, healthy weight changes happen gradually. Aim for 0.5-1 kg per week for sustainable results. What specific challenges are you facing?`;
    }
    
    if (message.includes('time') || message.includes('busy') || message.includes('schedule')) {
      return `I totally understand the time crunch! Here are efficient workout strategies:

⚡ **HIIT Workouts**: 15-20 minutes of high-intensity intervals
🏠 **Bodyweight Exercises**: No equipment needed - squats, push-ups, planks
🚶‍♀️ **Daily Movement**: Take stairs, walk during calls, park farther away
🌅 **Morning Routines**: 10-15 minutes before your day starts

**Quick Workout Ideas:**
- 7-minute bodyweight circuit
- Tabata training (4 minutes!)
- Lunchtime walk
- Desk exercises throughout the day

The key is consistency over duration. Even 10 minutes daily is better than 2 hours once a week. What time of day works best for you?`;
    }
    
    // Default responses
    const responses = [
      "That's a great question! I'm here to help you achieve your fitness goals. Could you tell me more about what specific area you'd like to focus on?",
      "I'd love to help you with that! Whether it's about workouts, nutrition, or motivation, I'm here to guide you. What's your main concern right now?",
      "Thanks for reaching out! As your AI fitness coach, I can help you with personalized advice. What aspect of your health journey would you like to explore?",
      "I'm excited to help you on your fitness journey! Tell me more about what you're looking to achieve or what challenges you're facing.",
      "Great to hear from you! I'm here to provide personalized guidance based on your goals and preferences. What would you like to know more about?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, you'd integrate with Web Speech API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Fitness Coach</h1>
              <p className="text-gray-600">Your personal AI-powered fitness companion</p>
            </div>
          </div>
          
          {/* Quick Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-left"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${prompt.color} flex items-center justify-center mb-2`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{prompt.text}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-blue-500'
                    }`}>
                      {message.isUser ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div className={`p-4 rounded-xl ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fitness, nutrition, or wellness..."
                  className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={1}
                  style={{ minHeight: '56px' }}
                />
                <button
                  onClick={toggleListening}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;