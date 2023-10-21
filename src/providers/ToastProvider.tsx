import React, { createContext, useRef } from 'react'
import { Toast } from 'primereact/toast'

type ToastProps = {
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined
    summary?: string
    detail: string | number
}

interface MyContextProps {
    toast: React.MutableRefObject<Toast | null>
    showToast: ({ severity, summary, detail }: ToastProps) => void
}

const MyContext = createContext<MyContextProps | any>(undefined)

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

    return <MyContext.Provider value={{ toast, showToast }}>{children}</MyContext.Provider>
}

export { MyContext, ToastProvider }
