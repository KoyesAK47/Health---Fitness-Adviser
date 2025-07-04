import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Dumbbell, 
  Apple, 
  MessageCircle, 
  User, 
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const { currentView, setCurrentView } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'coach', label: 'AI Coach', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:shadow-none md:bg-gradient-to-r md:from-emerald-600 md:to-blue-600 md:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:space-x-8 py-2 md:py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-emerald-600 bg-emerald-50 md:text-white md:bg-white/20' 
                    : 'text-gray-600 hover:text-emerald-600 md:text-white/80 md:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span className="text-xs font-medium hidden md:block">{item.label}</span>
              </motion.button>
            );
          })}
          
          <motion.button
            onClick={logout}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg text-red-600 hover:text-red-700 transition-colors md:text-white/80 md:hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span className="text-xs font-medium hidden md:block">Logout</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;