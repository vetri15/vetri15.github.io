'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

interface AppNotifierContextValue {
    notify: React.Dispatch<string>
}

const AppNotifierContext = React.createContext<AppNotifierContextValue | null>(null)

export const AppNotifierProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = React.useState('')
    const timerRef = React.useRef<number | null>(null)

    const clearTimer = React.useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }, [])

    const notify = React.useCallback(
        (nextMessage: string) => {
            clearTimer()
            setMessage(nextMessage)
            timerRef.current = window.setTimeout(() => {
                setMessage('')
            }, 1800)
        },
        [clearTimer],
    )

    React.useEffect(() => {
        return clearTimer
    }, [clearTimer])

    return (
        <AppNotifierContext.Provider value={{ notify }}>
            {children}
            <div
                role="status"
                aria-live="polite"
                className={cn(
                    'pointer-events-none fixed left-1/2 top-4 z-[60] -translate-x-1/2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-blue-600 shadow-lg transition-all duration-200 dark:text-blue-400 sm:top-6',
                    message ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
                )}
            >
                {message}
            </div>
        </AppNotifierContext.Provider>
    )
}

export const useAppNotifier = () => {
    const context = React.useContext(AppNotifierContext)

    if (!context) {
        throw new Error('useAppNotifier must be used within AppNotifierProvider')
    }

    return context
}
