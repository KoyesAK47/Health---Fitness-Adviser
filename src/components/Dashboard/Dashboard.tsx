import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  Droplets,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { calculateBMI, getBMICategory, getBMIColor, calculateDailyCalories } from '../../utils/calculations';
import { getRandomTip } from '../../data/healthTips';
import DashboardCard from './DashboardCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { waterIntake, setWaterIntake, dailyTip, setDailyTip, setCurrentView } = useApp();

  useEffect(() => {
    // Set a random tip daily
    const today = new Date().toDateString();
    const lastTipDate = localStorage.getItem('lastTipDate');
    
    if (lastTipDate !== today) {
      setDailyTip(getRandomTip());
      localStorage.setItem('lastTipDate', today);
    }
  }, [setDailyTip]);

  if (!user) return null;

  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);
  const bmiColor = getBMIColor(bmi);
  const dailyCalories = calculateDailyCalories(user);

  const addWaterGlass = () => {
    setWaterIntake(prev => prev + 1);
  };

  const resetWaterIntake = () => {
    setWaterIntake(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </motion.div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="BMI Status"
            value={bmi.toFixed(1)}
            subtitle={bmiCategory}
            icon={Heart}
            color="bg-gradient-to-r from-red-500 to-pink-500"
          />
          
          <DashboardCard
            title="Daily Calories"
            value={dailyCalories}
            subtitle="recommended"
            icon={Zap}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
            onClick={() => setCurrentView('nutrition')}
          />
          
          <DashboardCard
            title="Water Intake"
            value={waterIntake}
            subtitle="glasses today"
            icon={Droplets}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
            onClick={addWaterGlass}
          />
          
          <DashboardCard
            title="Active Days"
            value={7}
            subtitle="this week"
            icon={Activity}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
            onClick={() => setCurrentView('progress')}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
            onClick={() => setCurrentView('fitness')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                <Target size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Start Workout</h3>
                <p className="text-gray-600">Get your personalized plan</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
            onClick={() => setCurrentView('coach')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Coach</h3>
                <p className="text-gray-600">Get personalized advice</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
            onClick={() => setCurrentView('progress')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
                <p className="text-gray-600">Monitor your journey</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-lg p-6 text-white mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Daily Health Tip</h3>
              <p className="text-white/90">{dailyTip}</p>
            </div>
          </div>
        </motion.div>

        {/* Water Intake Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Water Intake Tracker</h3>
            <button
              onClick={resetWaterIntake}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex space-x-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-10 rounded-lg cursor-pointer transition-all duration-200 ${
                    i < waterIntake
                      ? 'bg-gradient-to-t from-blue-500 to-cyan-400'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={addWaterGlass}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {waterIntake}/8 glasses
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(waterIntake / 8) * 100}%` }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;