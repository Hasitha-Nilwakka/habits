//zustand handles the global state
//useHabitstire can be used everywhere without prop grilling

import { Category } from "@/types";
import { create } from "zustand";

type habitStore = {
    selectedCategory : Category | null
    isFormOpen : boolean
    setSelectedCategory : (category : Category | null) => void
    setIsFormOpen : () => void
}

export const useHabitStore = create<habitStore>((set) => ({
    selectedCategory : null,
    isFormOpen : false,
    setSelectedCategory : (category) => set(() => ({selectedCategory : category})),
    setIsFormOpen : () => set((state) => ({isFormOpen : !state.isFormOpen}))
}))