import { User } from '../types';

export const calculateBMI = (weight: number, height: number): number => {
  // height should be in meters
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const getBMIColor = (bmi: number): string => {
  if (bmi < 18.5) return 'text-blue-600';
  if (bmi < 25) return 'text-green-600';
  if (bmi < 30) return 'text-yellow-600';
  return 'text-red-600';
};

export const calculateDailyCalories = (user: User): number => {
  // Mifflin-St Jeor Equation
  let bmr: number;
  
  if (user.gender === 'male') {
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
  } else {
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  }
  
  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725
  };
  
  const dailyCalories = bmr * activityMultipliers[user.activityLevel];
  
  // Adjust based on fitness goal
  switch (user.fitnessGoal) {
    case 'lose_weight':
      return Math.round(dailyCalories * 0.8); // 20% deficit
    case 'build_muscle':
      return Math.round(dailyCalories * 1.1); // 10% surplus
    case 'stay_active':
    case 'endurance':
    default:
      return Math.round(dailyCalories);
  }
};

export const getIdealWeight = (height: number, gender: string): { min: number, max: number } => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 24.9 * heightInMeters * heightInMeters;
  
  return {
    min: Math.round(minWeight),
    max: Math.round(maxWeight)
  };
};