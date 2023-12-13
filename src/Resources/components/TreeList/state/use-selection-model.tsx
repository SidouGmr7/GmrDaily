import { create } from 'zustand'

interface SelectionModel {
    onSelection: boolean
    setOnSelection: (value: boolean) => void
}

export const useSelectionModel = create<SelectionModel>((set) => ({
    onSelection: true,
    setOnSelection: (value: boolean) => set({ onSelection: value }),
}))
