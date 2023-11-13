import React from 'react'
import { create } from 'zustand'
import { Toast } from 'primereact/toast'

type ToastProps = {
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined
    summary?: string
    detail?: string | number | undefined
}

interface ToastModel {
    toast: React.MutableRefObject<Toast | null>
    showToast: (props: ToastProps) => void
    handleError: (error: any) => void
    onSelection: boolean
    setOnSelection: (value: boolean) => void
}

export const useToastModel = create<ToastModel>((set) => ({
    toast: React.createRef<Toast>(),
    showToast: (props: ToastProps) => {
        set((state) => {
            if (state.toast.current) {
                state.toast.current.show({
                    severity: props.severity || 'success',
                    ...props,
                })
            } else {
                console.warn('There is a problem with your toast')
            }
            return state
        })
    },
    handleError: (error: any) => {
        set((state) => {
            console.error('An error occurred:', error)
            if (state.toast.current) {
                state.toast.current.show({
                    summary: error.message || 'there is an error in firebase',
                    severity: 'error',
                })
            } else {
                console.warn('There is a problem with your toast')
            }
            return state
        })
    },
    onSelection: true,
    setOnSelection: (value: boolean) => set({ onSelection: value }),
}))
