import { create } from 'zustand'
import { CheckBoxNodes } from '../types'

interface CheckboxDataModel {
    selectedKeys: CheckBoxNodes
    setSelectedKeys: (data: CheckBoxNodes) => void
}

export const useCheckboxDataModel = create<CheckboxDataModel>((set) => ({
    selectedKeys: {},
    setSelectedKeys: (data) => {
        set({ selectedKeys: data })
    },
}))
