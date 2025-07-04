import { WorkoutPlan, Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    type: 'strength',
    reps: 15,
    sets: 3,
    description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
    targetMuscles: ['chest', 'shoulders', 'triceps', 'core']
  },
  {
    id: 'squats',
    name: 'Squats',
    type: 'strength',
    reps: 20,
    sets: 3,
    description: 'Fundamental lower body exercise targeting glutes and quadriceps',
    targetMuscles: ['glutes', 'quadriceps', 'hamstrings', 'calves']
  },
  {
    id: 'planks',
    name: 'Planks',
    type: 'strength',
    duration: 60,
    sets: 3,
    description: 'Core strengthening exercise that builds stability and endurance',
    targetMuscles: ['core', 'shoulders', 'back']
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    type: 'cardio',
    duration: 30,
    sets: 3,
    description: 'High-energy cardio exercise that gets your heart pumping',
    targetMuscles: ['full-body']
  },
  {
    id: 'lunges',
    name: 'Lunges',
    type: 'strength',
    reps: 12,
    sets: 3,
    description: 'Unilateral leg exercise that builds strength and balance',
    targetMuscles: ['glutes', 'quadriceps', 'hamstrings']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    type: 'cardio',
    duration: 45,
    sets: 3,
    description: 'Dynamic cardio exercise that combines core and cardio training',
    targetMuscles: ['core', 'shoulders', 'legs']
  },
  {
    id: 'burpees',
    name: 'Burpees',
    type: 'cardio',
    reps: 10,
    sets: 3,
    description: 'Full-body exercise that combines strength and cardio',
    targetMuscles: ['full-body']
  },
  {
    id: 'child-pose',
    name: 'Child\'s Pose',
    type: 'flexibility',
    duration: 60,
    sets: 1,
    description: 'Restorative yoga pose that stretches the back and hips',
    targetMuscles: ['back', 'hips', 'shoulders']
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    type: 'flexibility',
    reps: 15,
    sets: 2,
    description: 'Dynamic spine mobility exercise',
    targetMuscles: ['spine', 'core']
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    type: 'cardio',
    duration: 30,
    sets: 3,
    description: 'Dynamic cardio exercise to elevate heart rate',
    targetMuscles: ['legs', 'core']
  }
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'beginner-strength',
    name: 'Beginner Strength Training',
    type: 'strength',
    duration: 30,
    difficulty: 'beginner',
    goal: 'build_muscle',
    exercises: ['push-ups', 'squats', 'planks', 'lunges'].map(id => 
      exercises.find(ex => ex.id === id)!
    )
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    type: 'cardio',
    duration: 25,
    difficulty: 'intermediate',
    goal: 'lose_weight',
    exercises: ['jumping-jacks', 'mountain-climbers', 'burpees', 'high-knees'].map(id => 
      exercises.find(ex => ex.id === id)!
    )
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility Flow',
    type: 'flexibility',
    duration: 20,
    difficulty: 'beginner',
    goal: 'stay_active',
    exercises: ['child-pose', 'cat-cow', 'planks'].map(id => 
      exercises.find(ex => ex.id === id)!
    )
  },
  {
    id: 'full-body-hiit',
    name: 'Full Body HIIT',
    type: 'cardio',
    duration: 35,
    difficulty: 'advanced',
    goal: 'endurance',
    exercises: ['burpees', 'mountain-climbers', 'squats', 'push-ups', 'jumping-jacks'].map(id => 
      exercises.find(ex => ex.id === id)!
    )
  }
];