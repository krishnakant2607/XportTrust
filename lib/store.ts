import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'exporter' | 'admin' | 'agent';
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
