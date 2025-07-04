import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Weight, 
  Activity, 
  Target,
  Plus,
  Trophy,
  Droplets
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const { progressData, addProgressEntry } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: '',
    workoutCompleted: false,
    waterIntake: '',
    caloriesConsumed: '',
    notes: ''
  });

  if (!user) return null;

  // Generate sample data for charts
  const generateSampleData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: user.weight + (Math.random() - 0.5) * 2,
        workouts: Math.floor(Math.random() * 2),
        water: Math.floor(Math.random() * 8) + 2,
        calories: Math.floor(Math.random() * 500) + 1500
      });
    }
    
    return data;
  };

  const sampleData = generateSampleData();

  const handleAddEntry = () => {
    const entry = {
      date: new Date(),
      weight: newEntry.weight ? parseFloat(newEntry.weight) : undefined,
      workoutCompleted: newEntry.workoutCompleted,
      waterIntake: newEntry.waterIntake ? parseInt(newEntry.waterIntake) : undefined,
      caloriesConsumed: newEntry.caloriesConsumed ? parseInt(newEntry.caloriesConsumed) : undefined,
      notes: newEntry.notes || undefined
    };

    addProgressEntry(entry);
    setNewEntry({
      weight: '',
      workoutCompleted: false,
      waterIntake: '',
      caloriesConsumed: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const getStreakDays = () => {
    // Calculate workout streak
    return Math.floor(Math.random() * 15) + 1; // Mock data
  };

  const getTotalWorkouts = () => {
    return Math.floor(Math.random() * 50) + 10; // Mock data
  };

  const getWeightChange = () => {
    const initial = user.weight;
    const current = sampleData[sampleData.length - 1].weight;
    return (current - initial).toFixed(1);
  };

  const renderAddModal = () => {
    if (!showAddModal) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Add Progress Entry</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={newEntry.weight}
                onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Intake (glasses)
              </label>
              <input
                type="number"
                value={newEntry.waterIntake}
                onChange={(e) => setNewEntry(prev => ({ ...prev, waterIntake: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Number of glasses"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories Consumed
              </label>
              <input
                type="number"
                value={newEntry.caloriesConsumed}
                onChange={(e) => setNewEntry(prev => ({ ...prev, caloriesConsumed: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Total calories"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newEntry.workoutCompleted}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, workoutCompleted: e.target.checked }))}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">Completed workout today</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                placeholder="Any additional notes..."
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEntry}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all"
            >
              Add Entry
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracker</h1>
            <p className="text-gray-600">Monitor your fitness journey and celebrate achievements</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all"
          >
            <Plus size={20} />
            <span>Add Entry</span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
                <Trophy size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{getStreakDays()}</p>
                <p className="text-sm text-gray-500">days</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Current Streak</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Activity size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{getTotalWorkouts()}</p>
                <p className="text-sm text-gray-500">total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Workouts Completed</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                <Weight size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{getWeightChange()}</p>
                <p className="text-sm text-gray-500">kg change</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Weight Progress</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                <Droplets size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-500">avg daily</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Hydration Goal</h3>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weight Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="workouts" fill="#3b82f6" name="Workouts" />
                <Bar dataKey="water" fill="#06b6d4" name="Water (glasses)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
          
          {progressData.length === 0 ? (
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No progress entries yet</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all"
              >
                Add Your First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {progressData.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {entry.date.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {entry.weight && `Weight: ${entry.weight}kg`}
                        {entry.waterIntake && ` • Water: ${entry.waterIntake} glasses`}
                        {entry.workoutCompleted && ` • Workout completed`}
                      </p>
                    </div>
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Add Entry Modal */}
        {renderAddModal()}
      </div>
    </div>
  );
};

export default ProgressTracker;