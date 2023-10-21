import React, { createContext, useRef } from 'react'
import { Toast } from 'primereact/toast'

type ToastProps = {
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined
    summary?: string
    detail: string | number
}

interface ToastContextProps {
    toast: React.MutableRefObject<Toast | null>
    showToast: ({ severity, summary, detail }: ToastProps) => void
}

const ToastContext = createContext<ToastContextProps | any>(undefined)

const ToastProvider = ({ children }: React.PropsWithChildren) => {
    const toast = useRef<Toast | null>(null)

    const showToast = (props: ToastProps) => {
        if (toast.current) {
            toast.current.show({
                severity: props.severity || 'success',
                ...props,
            })
        } else {
            console.warn('There is a problem with your toast')
        }
    }

    return <ToastContext.Provider value={{ toast, showToast }}>{children}</ToastContext.Provider>
}

export { ToastContext, ToastProvider }
