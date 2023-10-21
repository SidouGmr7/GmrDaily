import { useEffect } from 'react'
import _ from 'lodash'

// Define the custom hook
export function useLocalStorage(key: string, initialValue: any) {
    const storedValue = localStorage.getItem(key)
    let localStorageData
    if (storedValue && !_.isEmpty(storedValue)) {
        localStorageData = storedValue && JSON?.parse(storedValue)
    }
    useEffect(() => {
        if (initialValue && !_.isEmpty(initialValue)) {
            localStorage.setItem('nodes', JSON.stringify(initialValue))
        }
    }, [initialValue])

    return { localStorageData }
}
