export const healthTips = [
  "Stay hydrated! Aim for 8 glasses of water daily to maintain optimal body function.",
  "Get 7-9 hours of quality sleep each night to support muscle recovery and mental health.",
  "Include 5 servings of fruits and vegetables in your daily diet for essential nutrients.",
  "Take the stairs instead of elevators when possible to increase daily activity.",
  "Practice deep breathing exercises to reduce stress and improve focus.",
  "Stretch for 10 minutes daily to improve flexibility and reduce muscle tension.",
  "Limit processed foods and opt for whole, nutrient-dense options.",
  "Take regular breaks from screen time to protect your eyes and posture.",
  "Meal prep on weekends to maintain healthy eating habits throughout the week.",
  "Listen to your body - rest when you need it and push when you feel strong.",
  "Include protein in every meal to support muscle maintenance and satiety.",
  "Practice gratitude daily to boost mental well-being and reduce stress.",
  "Stand up and move every hour if you have a desk job to combat sedentary behavior.",
  "Choose stairs over elevators to add extra cardio to your day.",
  "Keep healthy snacks nearby to avoid reaching for processed options."
];

export const getRandomTip = () => {
  return healthTips[Math.floor(Math.random() * healthTips.length)];
};