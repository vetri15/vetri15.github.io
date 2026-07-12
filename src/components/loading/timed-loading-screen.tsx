'use client'

import { VT_LOADING_CYCLE_DURATION, VT_LOADING_FADE_DURATION } from '@/components/loading/loading-constants'
import { LoadingScreen } from '@/components/loading/loading-screen'
import { useLoadingScreen } from '@/components/loading/loading-screen-provider'
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface TimedLoadingScreenProps {
    duration?: number
    label?: string
    className?: string
}

type LoadingPhase = 'visible' | 'leaving' | 'hidden'

export const TimedLoadingScreen = ({
    duration = VT_LOADING_CYCLE_DURATION,
    label = 'Loading',
    className,
}: TimedLoadingScreenProps) => {
    const { isLoading: isProviderLoading, showLoadingScreen } = useLoadingScreen()
    const usesProvider = React.useRef(isProviderLoading).current
    const [phase, setPhase] = React.useState<LoadingPhase>('visible')

    React.useEffect(() => {
        if (usesProvider) {
            const finishLoading = showLoadingScreen({ label, className })
            const hideTimer = window.setTimeout(finishLoading, Math.max(duration, 0))

            return () => {
                window.clearTimeout(hideTimer)
                finishLoading()
            }
        }

        const visibleDuration = Math.max(duration, VT_LOADING_CYCLE_DURATION)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const fadeTimer = window.setTimeout(() => {
            setPhase('leaving')
        }, visibleDuration)

        const hideTimer = window.setTimeout(() => {
            document.body.style.overflow = previousOverflow
            setPhase('hidden')
        }, visibleDuration + VT_LOADING_FADE_DURATION)

        return () => {
            window.clearTimeout(fadeTimer)
            window.clearTimeout(hideTimer)
            document.body.style.overflow = previousOverflow
        }
    }, [className, duration, label, showLoadingScreen, usesProvider])

    if (usesProvider || phase === 'hidden') {
        return null
    }

    return (
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
    )
}
