'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { routes } from '@/data'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const sectionRouteMap = {
    about: '/about',
    projects: '/projects',
    contact: '/contact',
} as const

const observerThresholds = [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1]

export const DesktopNav = () => {
    const pathname = usePathname()
    const [activeSectionPath, setActiveSectionPath] = useState('/')

    useEffect(() => {
        if (pathname !== '/') {
            setActiveSectionPath('/')
            return
        }

        const sectionIds = Object.keys(sectionRouteMap) as Array<keyof typeof sectionRouteMap>
        const sections = sectionIds
            .map((sectionId) => document.getElementById(sectionId))
            .filter((section): section is HTMLElement => section !== null)

        if (!sections.length) {
            setActiveSectionPath('/')
            return
        }

        const visibleSections = new Map<string, number>()

        const updateActiveSection = () => {
            if (!visibleSections.size) {
                setActiveSectionPath('/')
                return
            }

            const [nextSectionId] = [...visibleSections.entries()].sort((left, right) => right[1] - left[1])[0]
            setActiveSectionPath(sectionRouteMap[nextSectionId as keyof typeof sectionRouteMap] ?? '/')
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.id

                    if (entry.isIntersecting) {
                        visibleSections.set(sectionId, entry.intersectionRatio)
                        return
                    }

                    visibleSections.delete(sectionId)
                })

                updateActiveSection()
            },
            {
                rootMargin: '-96px 0px -45% 0px',
                threshold: observerThresholds,
            },
        )

        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [pathname])

    const activePath = pathname === '/' ? activeSectionPath : pathname

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
                        className={`${isActive(route.path) && 'text-primary'}`}
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
