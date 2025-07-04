import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProgressEntry, ChatMessage } from '../types';

interface AppContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  progressData: ProgressEntry[];
  addProgressEntry: (entry: ProgressEntry) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  waterIntake: number;
  setWaterIntake: (intake: number) => void;
  dailyTip: string;
  setDailyTip: (tip: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyTip, setDailyTip] = useState('Stay hydrated! Aim for 8 glasses of water daily.');

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgressData(prev => [...prev, entry]);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      progressData,
      addProgressEntry,
      chatMessages,
      addChatMessage,
      waterIntake,
      setWaterIntake,
      dailyTip,
      setDailyTip
    }}>
      {children}
    </AppContext.Provider>
  );
};