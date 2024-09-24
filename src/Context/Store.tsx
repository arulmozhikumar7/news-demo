import { create } from "zustand";
import { User } from "firebase/auth"; 

interface StoreState {
  user: User | null;  
  setUser: (user: User | null) => void; 
  country: string;
  setCountry: (country: string) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }), 
  country: "India",
  setCountry: (country) => set({ country }),
}));

export default useStore;
