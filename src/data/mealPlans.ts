import { MealPlan } from '../types';

export const mealPlans: MealPlan[] = [
  {
    id: 'protein-breakfast',
    name: 'Protein Power Breakfast',
    type: 'breakfast',
    calories: 350,
    protein: 25,
    carbs: 30,
    fat: 15,
    ingredients: ['2 eggs', '1 slice whole grain toast', '1/2 avocado', 'spinach', 'tomatoes'],
    instructions: [
      'Scramble eggs with spinach and tomatoes',
      'Toast bread and top with sliced avocado',
      'Serve together with a glass of water'
    ],
    dietaryTags: ['balanced', 'vegetarian']
  },
  {
    id: 'quinoa-bowl',
    name: 'Mediterranean Quinoa Bowl',
    type: 'lunch',
    calories: 450,
    protein: 18,
    carbs: 55,
    fat: 20,
    ingredients: ['1 cup quinoa', 'cucumber', 'cherry tomatoes', 'feta cheese', 'olive oil', 'lemon'],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables and mix with quinoa',
      'Add feta cheese and dress with olive oil and lemon',
      'Season with herbs and serve'
    ],
    dietaryTags: ['balanced', 'vegetarian']
  },
  {
    id: 'grilled-salmon',
    name: 'Grilled Salmon with Vegetables',
    type: 'dinner',
    calories: 520,
    protein: 35,
    carbs: 25,
    fat: 30,
    ingredients: ['salmon fillet', 'broccoli', 'sweet potato', 'olive oil', 'garlic', 'herbs'],
    instructions: [
      'Season salmon with herbs and garlic',
      'Grill salmon for 6-8 minutes per side',
      'Steam broccoli and roast sweet potato',
      'Drizzle with olive oil and serve'
    ],
    dietaryTags: ['balanced', 'keto']
  },
  {
    id: 'keto-salad',
    name: 'Keto Chicken Salad',
    type: 'lunch',
    calories: 400,
    protein: 30,
    carbs: 8,
    fat: 28,
    ingredients: ['chicken breast', 'mixed greens', 'avocado', 'bacon', 'cheese', 'olive oil'],
    instructions: [
      'Grill chicken breast and slice',
      'Prepare mixed greens in a bowl',
      'Add sliced avocado, bacon, and cheese',
      'Top with chicken and dress with olive oil'
    ],
    dietaryTags: ['keto']
  },
  {
    id: 'veggie-smoothie',
    name: 'Green Power Smoothie',
    type: 'snack',
    calories: 180,
    protein: 8,
    carbs: 35,
    fat: 4,
    ingredients: ['spinach', 'banana', 'apple', 'almond milk', 'chia seeds'],
    instructions: [
      'Add all ingredients to blender',
      'Blend until smooth',
      'Add ice if desired',
      'Serve immediately'
    ],
    dietaryTags: ['vegetarian', 'balanced']
  },
  {
    id: 'paleo-bowl',
    name: 'Paleo Power Bowl',
    type: 'dinner',
    calories: 480,
    protein: 32,
    carbs: 20,
    fat: 32,
    ingredients: ['grass-fed beef', 'sweet potato', 'brussels sprouts', 'avocado', 'coconut oil'],
    instructions: [
      'Cook beef in coconut oil',
      'Roast sweet potato and brussels sprouts',
      'Slice avocado',
      'Combine in bowl and serve'
    ],
    dietaryTags: ['paleo']
  }
];