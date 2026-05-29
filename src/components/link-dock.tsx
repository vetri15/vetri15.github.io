'use client'

import { BrandLogo } from '@/components/brand-logo'
import { dock as docks } from '@/data/dock'
import React from 'react'

export const LinkDock = () => {
    const [isAtPageBottom, setIsAtPageBottom] = React.useState(false)
    const dockRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const findScrollParent = (element: HTMLElement | null) => {
            let parent = element?.parentElement

            while (parent) {
                const { overflowY } = window.getComputedStyle(parent)
                const canScroll = /(auto|scroll|overlay)/.test(overflowY) && parent.scrollHeight > parent.clientHeight

                if (canScroll) {
                    return parent
                }

                parent = parent.parentElement
            }

            return null
        }

        const scrollParent = findScrollParent(dockRef.current)

        const updateBottomState = () => {
            const scrollElement = scrollParent ?? document.scrollingElement ?? document.documentElement
            const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight
            const isScrolledToBottom = Math.ceil(scrollElement.scrollTop) >= maxScrollTop

            setIsAtPageBottom(maxScrollTop > 0 && isScrolledToBottom)
        }

        updateBottomState()
        scrollParent?.addEventListener('scroll', updateBottomState, { passive: true })
        window.addEventListener('scroll', updateBottomState, { passive: true })
        window.addEventListener('resize', updateBottomState)

        return () => {
            scrollParent?.removeEventListener('scroll', updateBottomState)
            window.removeEventListener('scroll', updateBottomState)
            window.removeEventListener('resize', updateBottomState)
        }
    }, [])

    return (
        <div
            ref={dockRef}
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-opacity duration-500 ${
                isAtPageBottom ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            <div className="animate-shimmer rounded-full bg-[linear-gradient(to_right,#FF00FF,rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),#10b981,#FF00FF)] p-[2px]">
                <div className="flex items-center space-x-6 rounded-full bg-white px-4 py-3 shadow-lg dark:bg-black">
                    {docks.map((dock) => (
                        <a
                            key={dock.link}
                            href={dock.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={dock.label}
                            className="flex items-center justify-center text-2xl transition-colors hover:text-primary"
                        >
                            <BrandLogo icon={dock.icon} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
