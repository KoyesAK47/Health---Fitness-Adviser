import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Play, 
  CheckCircle,
  Star,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { workoutPlans } from '../../data/workoutPlans';
import { WorkoutPlan } from '../../types';

const FitnessPlanner: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [filter, setFilter] = useState<'all' | 'cardio' | 'strength' | 'flexibility'>('all');
  const [startedWorkout, setStartedWorkout] = useState(false);

  if (!user) return null;

  const filteredPlans = workoutPlans.filter(plan => 
    filter === 'all' || plan.type === filter
  );

  const getRecommendedPlans = () => {
    return workoutPlans.filter(plan => plan.goal === user.fitnessGoal);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio': return 'bg-red-500';
      case 'strength': return 'bg-blue-500';
      case 'flexibility': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const startWorkout = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setStartedWorkout(true);
  };

  const renderWorkoutDetails = () => {
    if (!selectedPlan) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h3>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedPlan.difficulty)}`}>
                {selectedPlan.difficulty.charAt(0).toUpperCase() + selectedPlan.difficulty.slice(1)}
              </span>
              <span className="flex items-center space-x-1 text-gray-600">
                <Clock size={16} />
                <span>{selectedPlan.duration} min</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedPlan(null)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Exercises</h4>
          {selectedPlan.exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900">{exercise.name}</h5>
                <p className="text-sm text-gray-600">{exercise.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {exercise.sets && (
                    <span className="text-sm text-gray-500">{exercise.sets} sets</span>
                  )}
                  {exercise.reps && (
                    <span className="text-sm text-gray-500">{exercise.reps} reps</span>
                  )}
                  {exercise.duration && (
                    <span className="text-sm text-gray-500">{exercise.duration} sec</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {exercise.targetMuscles.map((muscle, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startWorkout(selectedPlan)}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
          >
            <Play size={20} />
            <span>Start Workout</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save for Later
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const renderWorkoutSession = () => {
    if (!startedWorkout || !selectedPlan) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Workout Started!</h3>
            <p className="text-gray-600">Great job taking the first step. Follow your plan and stay consistent!</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">Pro Tips:</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Stay hydrated throughout your workout</li>
                <li>• Focus on proper form over speed</li>
                <li>• Listen to your body and rest when needed</li>
                <li>• Track your progress after completion</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStartedWorkout(false)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold"
            >
              Got it!
            </motion.button>
          </div>
        </div>
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fitness Planner</h1>
          <p className="text-gray-600">Personalized workout plans tailored to your goals</p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'cardio', 'strength', 'flexibility'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === type
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Recommended Plans */}
        {getRecommendedPlans().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Star className="text-yellow-500" size={24} />
              <span>Recommended for You</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRecommendedPlans().map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-yellow-200"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${getTypeColor(plan.type)}`}>
                      <Dumbbell size={24} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium text-yellow-600">Recommended</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(plan.difficulty)}`}>
                      {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
                    </span>
                    <span className="flex items-center space-x-1 text-gray-600">
                      <Clock size={16} />
                      <span>{plan.duration} min</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {plan.exercises.length} exercises targeting {plan.type}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      startWorkout(plan);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <Play size={16} />
                    <span>Start Now</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Workout Plan Details */}
        {renderWorkoutDetails()}

        {/* All Workout Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Workout Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getTypeColor(plan.type)}`}>
                    <Dumbbell size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{plan.type}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-center space-x-4 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
                  </span>
                  <span className="flex items-center space-x-1 text-gray-600">
                    <Clock size={16} />
                    <span>{plan.duration} min</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {plan.exercises.length} exercises targeting {plan.type}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    startWorkout(plan);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
                >
                  <Play size={16} />
                  <span>Start Now</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workout Session Modal */}
        {renderWorkoutSession()}
      </div>
    </div>
  );
};

export default FitnessPlanner;