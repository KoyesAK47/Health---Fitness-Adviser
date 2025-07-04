export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  fitnessGoal: 'lose_weight' | 'build_muscle' | 'stay_active' | 'endurance';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  dietaryPreference: 'balanced' | 'vegetarian' | 'keto' | 'paleo';
  createdAt: Date;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  goal: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility';
  duration?: number;
  reps?: number;
  sets?: number;
  description: string;
  targetMuscles: string[];
}

export interface MealPlan {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  dietaryTags: string[];
}

export interface ProgressEntry {
  date: Date;
  weight?: number;
  workoutCompleted?: boolean;
  waterIntake?: number;
  caloriesConsumed?: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}