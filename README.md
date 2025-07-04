# Fitness & Health Advice Application

A modern, production-ready fitness and health web application built with React, TypeScript, Vite, and Tailwind CSS. This app provides personalized workout plans, nutrition guides, progress tracking, and an AI-powered fitness coach.

## Features

- **User Authentication**: Register and login with profile setup.
- **Personal Dashboard**: Overview of BMI, daily calories, water intake, and daily health tips.
- **Fitness Planner**: Personalized workout plans filtered by type, difficulty, and user goals.
- **Nutrition Guide**: Meal plans tailored to dietary preferences, with nutrition facts and recipes.
- **Progress Tracker**: Log workouts, weight, water intake, calories, and notes. Visualize progress with charts.
- **AI Coach**: Chat with an AI for fitness, nutrition, and motivation advice.
- **Profile Management**: Edit personal info, fitness goals, and view achievements.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API
- **Persistence**: LocalStorage (no backend required)

## Project Structure

```
src/
  components/
    AICoach/         # AI chat coach UI
    Auth/            # Login & registration forms
    Dashboard/       # Main dashboard cards & stats
    Fitness/         # Fitness planner & workout UI
    Layout/          # Navigation bar
    Nutrition/       # Nutrition guide & meal plans
    Profile/         # User profile & achievements
    Progress/        # Progress tracker & charts
  contexts/
    AppContext.tsx   # App-wide state (progress, tips, etc)
    AuthContext.tsx  # Auth state & user info
  data/
    healthTips.ts    # Daily health tips
    mealPlans.ts     # Meal plan data
    workoutPlans.ts  # Workout plan & exercise data
  types/             # TypeScript interfaces
  utils/             # Calculation helpers (BMI, calories)
  App.tsx            # Main app logic & routing
  main.tsx           # Entry point
  index.css          # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```sh
npm run build
npm run preview
```

## Customization

- **Workout & Meal Data**: Edit files in [`src/data/`](src/data/) to add or modify workouts and meals.
- **Health Calculations**: Update logic in [`src/utils/calculations.ts`](src/utils/calculations.ts).
- **UI & Styling**: Modify components in [`src/components/`](src/components/) and styles in [`src/index.css`](src/index.css).

## License

This project is for educational and demonstration purposes.

---

**Made with React, TypeScript, and 💪 by your team!**