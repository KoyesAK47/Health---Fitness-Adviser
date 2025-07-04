import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Mail, 
  Calendar, 
  Weight, 
  Ruler, 
  Target, 
  Activity, 
  Utensils,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { calculateBMI, getBMICategory, getBMIColor, calculateDailyCalories } from '../../utils/calculations';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    fitnessGoal: user?.fitnessGoal || 'lose_weight',
    activityLevel: user?.activityLevel || 'moderately_active',
    dietaryPreference: user?.dietaryPreference || 'balanced'
  });

  if (!user) return null;

  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);
  const bmiColor = getBMIColor(bmi);
  const dailyCalories = calculateDailyCalories(user);

  const handleSave = () => {
    updateUser({
      name: editData.name,
      age: parseInt(editData.age),
      weight: parseFloat(editData.weight),
      height: parseFloat(editData.height),
      fitnessGoal: editData.fitnessGoal as any,
      activityLevel: editData.activityLevel as any,
      dietaryPreference: editData.dietaryPreference as any
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      age: user.age.toString(),
      weight: user.weight.toString(),
      height: user.height.toString(),
      fitnessGoal: user.fitnessGoal,
      activityLevel: user.activityLevel,
      dietaryPreference: user.dietaryPreference
    });
    setIsEditing(false);
  };

  const achievements = [
    { id: 1, name: 'First Workout', description: 'Completed your first workout session', earned: true },
    { id: 2, name: 'Week Warrior', description: 'Worked out 7 days in a row', earned: true },
    { id: 3, name: 'Goal Setter', description: 'Set up your fitness profile', earned: true },
    { id: 4, name: 'Nutrition Ninja', description: 'Logged meals for 5 days', earned: false },
    { id: 5, name: 'Consistency King', description: 'Maintained streak for 30 days', earned: false },
    { id: 6, name: 'Progress Tracker', description: 'Logged progress for 2 weeks', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
              <p className="text-gray-600">Manage your personal information and fitness goals</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all"
            >
              <Edit size={20} />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </p>
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Member since {user.createdAt.toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.age}
                        onChange={(e) => setEditData(prev => ({ ...prev, age: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.age} years</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.weight}
                        onChange={(e) => setEditData(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Weight in kg"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.weight} kg</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.height}
                        onChange={(e) => setEditData(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Height in cm"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.height} cm</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                    {isEditing ? (
                      <select
                        value={editData.fitnessGoal}
                        onChange={(e) => setEditData(prev => ({ ...prev, fitnessGoal: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="lose_weight">Lose Weight</option>
                        <option value="build_muscle">Build Muscle</option>
                        <option value="stay_active">Stay Active</option>
                        <option value="endurance">Build Endurance</option>
                      </select>
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900 capitalize">
                        {user.fitnessGoal.replace('_', ' ')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                    {isEditing ? (
                      <select
                        value={editData.activityLevel}
                        onChange={(e) => setEditData(prev => ({ ...prev, activityLevel: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="very_active">Very Active</option>
                      </select>
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900 capitalize">
                        {user.activityLevel.replace('_', ' ')}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                    {isEditing ? (
                      <select
                        value={editData.dietaryPreference}
                        onChange={(e) => setEditData(prev => ({ ...prev, dietaryPreference: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="balanced">Balanced</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                      </select>
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900 capitalize">
                        {user.dietaryPreference}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all"
                    >
                      <Save size={20} />
                      <span>Save Changes</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-300 transition-all"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Award size={24} className="text-yellow-500" />
                <span>Achievements</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                      }`}>
                        <Award size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Health Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Weight size={20} className="text-blue-500" />
                    <span className="font-medium">BMI</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{bmi.toFixed(1)}</div>
                    <div className={`text-sm ${bmiColor}`}>{bmiCategory}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target size={20} className="text-green-500" />
                    <span className="font-medium">Daily Calories</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{dailyCalories}</div>
                    <div className="text-sm text-gray-500">recommended</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity size={20} className="text-purple-500" />
                    <span className="font-medium">Activity Level</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg capitalize">
                      {user.activityLevel.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Utensils size={20} className="text-orange-500" />
                    <span className="font-medium">Diet Type</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg capitalize">
                      {user.dietaryPreference}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp size={24} />
                <span>Progress Summary</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Workouts</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Streak</span>
                  <span className="font-bold">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Achievements</span>
                  <span className="font-bold">3/6</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight Change</span>
                  <span className="font-bold">-2.5 kg</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;