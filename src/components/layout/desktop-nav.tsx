'use client'

import { useActiveHomeSection } from '@/hooks/use-active-home-section'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { routes } from '@/data'
import NextLink from 'next/link'
import { useMemo } from 'react'

export const DesktopNav = () => {
    const activePath = useActiveHomeSection()

    const isActive = useMemo(
        () => (path: string) => {
            return activePath === path
        },
        [activePath],
    )

    return (
        <div className="hidden items-center space-x-4 md:flex">
            <nav className="flex space-x-6 font-medium">
                {routes.map((route) => (
                    <NextLink
                        key={route.path}
                        href={route.path}
                        className={`nav-link ${isActive(route.path) ? 'nav-link-active text-primary' : ''}`}
                    >
                        {route.label}
                    </NextLink>
                ))}
            </nav>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center space-x-1">
                <ModeToggle />
                <NextLink
                    href="https://github.com/vetri15"
                    target="_blank"
                    aria-label="GitHub repository"
                >
                    <Button variant="ghost" size="icon" aria-label="GitHub repository">
                        <span className="icon-[tabler--brand-github] size-5" />
                    </Button>
                </NextLink>
            </div>
        </div>
    )
}
