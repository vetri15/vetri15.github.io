'use client'

import { VT_LOADING_CYCLE_DURATION, VT_LOADING_FADE_DURATION } from '@/components/loading/loading-constants'
import { LoadingScreen } from '@/components/loading/loading-screen'
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface LoadingScreenOptions {
    label?: string
    className?: string
}

const unavailableShowLoadingScreen = (options?: LoadingScreenOptions): (() => void) => {
    void options
    throw new Error('useLoadingScreen must be used within LoadingScreenProvider')
}

interface LoadingScreenContextValue {
    isLoading: boolean
    showLoadingScreen: typeof unavailableShowLoadingScreen
}

type LoadingPhase = 'visible' | 'leaving' | 'hidden'

const LoadingScreenContext = React.createContext<LoadingScreenContextValue>({
    isLoading: false,
    showLoadingScreen: unavailableShowLoadingScreen,
})

export const LoadingScreenProvider = ({ children }: { children: React.ReactNode }) => {
    const [phase, setPhase] = React.useState<LoadingPhase>('hidden')
    const [label, setLabel] = React.useState('Loading')
    const [className, setClassName] = React.useState<string | undefined>()
    const activeLoadersRef = React.useRef(0)
    const visibleSinceRef = React.useRef(0)
    const holdTimerRef = React.useRef<number | null>(null)
    const fadeTimerRef = React.useRef<number | null>(null)
    const previousOverflowRef = React.useRef<string | null>(null)

    const clearTimers = React.useCallback(() => {
        if (holdTimerRef.current !== null) {
            window.clearTimeout(holdTimerRef.current)
            holdTimerRef.current = null
        }

        if (fadeTimerRef.current !== null) {
            window.clearTimeout(fadeTimerRef.current)
            fadeTimerRef.current = null
        }
    }, [])

    const restoreBodyScroll = React.useCallback(() => {
        if (previousOverflowRef.current === null) {
            return
        }

        document.body.style.overflow = previousOverflowRef.current
        previousOverflowRef.current = null
    }, [])

    const finishLoading = React.useCallback(() => {
        const elapsed = Date.now() - visibleSinceRef.current
        const remainingCycle = Math.max(VT_LOADING_CYCLE_DURATION - elapsed, 0)

        holdTimerRef.current = window.setTimeout(() => {
            if (activeLoadersRef.current > 0) {
                return
            }

            setPhase('leaving')
            fadeTimerRef.current = window.setTimeout(() => {
                if (activeLoadersRef.current > 0) {
                    return
                }

                setPhase('hidden')
                restoreBodyScroll()
            }, VT_LOADING_FADE_DURATION)
        }, remainingCycle)
    }, [restoreBodyScroll])

    const showLoadingScreen = React.useCallback(
        ({ label: nextLabel = 'Loading', className: nextClassName }: LoadingScreenOptions = {}) => {
            const startsNewSession = activeLoadersRef.current === 0
            activeLoadersRef.current += 1

            if (startsNewSession) {
                clearTimers()
                visibleSinceRef.current = Date.now()
                setLabel(nextLabel)
                setClassName(nextClassName)
                setPhase('visible')

                if (previousOverflowRef.current === null) {
                    previousOverflowRef.current = document.body.style.overflow
                }

                document.body.style.overflow = 'hidden'
            }

            let isFinished = false

            return () => {
                if (isFinished) {
                    return
                }

                isFinished = true
                activeLoadersRef.current = Math.max(activeLoadersRef.current - 1, 0)

                if (activeLoadersRef.current === 0) {
                    finishLoading()
                }
            }
        },
        [clearTimers, finishLoading],
    )

    React.useEffect(() => {
        return () => {
            activeLoadersRef.current = 0
            clearTimers()
            restoreBodyScroll()
        }
    }, [clearTimers, restoreBodyScroll])

    const contextValue = React.useMemo(
        () => ({ isLoading: phase !== 'hidden', showLoadingScreen }),
        [phase, showLoadingScreen],
    )

    return (
        <LoadingScreenContext.Provider value={contextValue}>
            {children}
            {phase !== 'hidden' && (
                <div
                    className={cn(
                        'fixed inset-0 z-[100] transition-opacity ease-out',
                        phase === 'leaving' ? 'opacity-0' : 'opacity-100',
                        className,
                    )}
                    style={{ transitionDuration: `${VT_LOADING_FADE_DURATION}ms` }}
                >
                    <LoadingScreen variant="page" label={label} />
                </div>
            )}
        </LoadingScreenContext.Provider>
    )
}

export const useLoadingScreen = () => {
    return React.useContext(LoadingScreenContext)
}
