import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Apple, 
  Clock, 
  Zap, 
  Heart, 
  Utensils,
  Filter,
  Star,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mealPlans } from '../../data/mealPlans';
import { MealPlan } from '../../types';
import { calculateDailyCalories } from '../../utils/calculations';

const NutritionGuide: React.FC = () => {
  const { user } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);
  const [filter, setFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'balanced' | 'vegetarian' | 'keto' | 'paleo'>('all');

  if (!user) return null;

  const dailyCalories = calculateDailyCalories(user);

  const filteredMeals = mealPlans.filter(meal => {
    const typeMatch = filter === 'all' || meal.type === filter;
    const dietMatch = dietFilter === 'all' || meal.dietaryTags.includes(dietFilter);
    return typeMatch && dietMatch;
  });

  const getRecommendedMeals = () => {
    return mealPlans.filter(meal => 
      meal.dietaryTags.includes(user.dietaryPreference)
    );
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-yellow-500';
      case 'lunch': return 'bg-orange-500';
      case 'dinner': return 'bg-purple-500';
      case 'snack': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  const renderMealDetails = () => {
    if (!selectedMeal) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <span>{getMealTypeIcon(selectedMeal.type)}</span>
              <span>{selectedMeal.name}</span>
            </h3>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getMealTypeColor(selectedMeal.type)}`}>
                {selectedMeal.type.charAt(0).toUpperCase() + selectedMeal.type.slice(1)}
              </span>
              <span className="flex items-center space-x-1 text-gray-600">
                <Zap size={16} />
                <span>{selectedMeal.calories} cal</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedMeal(null)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Nutrition Facts */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{selectedMeal.calories}</div>
            <div className="text-sm text-red-800">Calories</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{selectedMeal.protein}g</div>
            <div className="text-sm text-blue-800">Protein</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{selectedMeal.carbs}g</div>
            <div className="text-sm text-green-800">Carbs</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{selectedMeal.fat}g</div>
            <div className="text-sm text-yellow-800">Fat</div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h4>
          <div className="grid grid-cols-2 gap-2">
            {selectedMeal.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h4>
          <div className="space-y-3">
            {selectedMeal.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Tags */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Dietary Information</h4>
          <div className="flex flex-wrap gap-2">
            {selectedMeal.dietaryTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium"
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
          >
            <Plus size={20} />
            <span>Add to Meal Plan</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save Recipe
          </motion.button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Guide</h1>
          <p className="text-gray-600">Discover healthy meal plans tailored to your dietary preferences</p>
        </motion.div>

        {/* Daily Nutrition Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-lg p-6 text-white mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Your Daily Nutrition Target</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{dailyCalories}</div>
              <div className="text-sm opacity-90">Daily Calories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(dailyCalories * 0.3 / 4)}</div>
              <div className="text-sm opacity-90">Protein (g)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(dailyCalories * 0.4 / 4)}</div>
              <div className="text-sm opacity-90">Carbs (g)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(dailyCalories * 0.3 / 9)}</div>
              <div className="text-sm opacity-90">Fat (g)</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center space-x-2 mr-4">
            <Filter size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Meal Type:</span>
          </div>
          {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
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
              {type === 'all' ? 'All Meals' : type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center space-x-2 mr-4">
            <Utensils size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Diet Type:</span>
          </div>
          {['all', 'balanced', 'vegetarian', 'keto', 'paleo'].map((diet) => (
            <motion.button
              key={diet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDietFilter(diet as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                dietFilter === diet
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {diet === 'all' ? 'All Diets' : diet.charAt(0).toUpperCase() + diet.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Recommended Meals */}
        {getRecommendedMeals().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Star className="text-yellow-500" size={24} />
              <span>Recommended for Your Diet</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRecommendedMeals().slice(0, 3).map((meal) => (
                <motion.div
                  key={meal.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-yellow-200 hover:shadow-xl transition-shadow duration-200"
                  onClick={() => setSelectedMeal(meal)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${getMealTypeColor(meal.type)}`}>
                      <span className="text-2xl">{getMealTypeIcon(meal.type)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium text-yellow-600">Recommended</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="flex items-center space-x-1 text-gray-600">
                      <Zap size={16} />
                      <span>{meal.calories} cal</span>
                    </span>
                    <span className="flex items-center space-x-1 text-gray-600">
                      <Heart size={16} />
                      <span>{meal.protein}g protein</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.dietaryTags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Meal Details */}
        {renderMealDetails()}

        {/* All Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Meal Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <motion.div
                key={meal.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={() => setSelectedMeal(meal)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getMealTypeColor(meal.type)}`}>
                    <span className="text-2xl">{getMealTypeIcon(meal.type)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{meal.type}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.name}</h3>
                <div className="flex items-center space-x-4 mb-3">
                  <span className="flex items-center space-x-1 text-gray-600">
                    <Zap size={16} />
                    <span>{meal.calories} cal</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-600">
                    <Heart size={16} />
                    <span>{meal.protein}g protein</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {meal.dietaryTags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {meal.ingredients.length} ingredients • {meal.instructions.length} steps
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionGuide;