// Zustand state for XP, Streaks, History
import { create } from "zustand";

interface AppState {
  xp: number;
  streak: number;
  history: any[];
  addXP: (amount: number) => void;
  incrementStreak: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  xp: 0,
  streak: 0,
  history: [],
  addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
}));
