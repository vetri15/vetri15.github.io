'use client'

import { useLoadingScreen } from '@/components/loading/loading-screen-provider'
import * as React from 'react'

export interface RouteLoadingScreenProps {
    label?: string
    className?: string
}

export const RouteLoadingScreen = ({ label = 'Loading page', className }: RouteLoadingScreenProps) => {
    const { showLoadingScreen } = useLoadingScreen()

    React.useEffect(() => {
        return showLoadingScreen({ label, className })
    }, [className, label, showLoadingScreen])

    return null
}
