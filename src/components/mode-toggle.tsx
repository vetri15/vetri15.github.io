'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ModeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = resolvedTheme === 'dark'
    const nextTheme = isDark ? 'light' : 'dark'
    const label = mounted ? `Switch to ${nextTheme} mode` : 'Toggle theme'

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                if (!mounted) {
                    return
                }

                setIsAnimating(false)
                requestAnimationFrame(() => {
                    setIsAnimating(true)
                })
                setTimeout(() => {
                    setIsAnimating(false)
                }, 220)
                setTheme(nextTheme)
            }}
            aria-label={label}
            title={label}
            className={`relative overflow-hidden rounded-full ${isAnimating ? 'theme-toggle-click' : ''}`}
        >
            <span
                className="icon-[tabler--sun] absolute size-5 rotate-0 scale-100 opacity-100 transition-all duration-300 dark:rotate-90 dark:scale-0 dark:opacity-0"
                aria-hidden="true"
            />
            <span
                className="icon-[tabler--moon-stars] absolute size-5 -rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
                aria-hidden="true"
            />
            <span className="sr-only">{label}</span>
        </Button>
    )
}
