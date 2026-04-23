'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const sectionRouteMap = {
    about: '/about',
    projects: '/projects',
    contact: '/contact',
} as const

const observerThresholds = [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1]

export const useActiveHomeSection = () => {
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

            let nextSectionId: keyof typeof sectionRouteMap = 'about'
            let highestIntersectionRatio = -1

            visibleSections.forEach((intersectionRatio, sectionId) => {
                if (intersectionRatio <= highestIntersectionRatio) {
                    return
                }

                highestIntersectionRatio = intersectionRatio
                nextSectionId = sectionId as keyof typeof sectionRouteMap
            })

            setActiveSectionPath(sectionRouteMap[nextSectionId] ?? '/')
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

    return pathname === '/' ? activeSectionPath : pathname
}
