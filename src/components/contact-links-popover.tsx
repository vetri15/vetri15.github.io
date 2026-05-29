'use client'

import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { connectLinks } from '@/data/connect-links'
import * as React from 'react'

export const ContactLinksPopover = () => {
    const [open, setOpen] = React.useState(false)
    const closeTimerRef = React.useRef<number | null>(null)

    const clearCloseTimer = React.useCallback(() => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }, [])

    const openPopover = React.useCallback(() => {
        clearCloseTimer()
        setOpen(true)
    }, [clearCloseTimer])

    const scheduleClose = React.useCallback(() => {
        clearCloseTimer()
        closeTimerRef.current = window.setTimeout(() => {
            setOpen(false)
        }, 180)
    }, [clearCloseTimer])

    const handlePointerEnter = React.useCallback(
        (event: React.PointerEvent) => {
            if (event.pointerType === 'mouse') {
                openPopover()
            }
        },
        [openPopover],
    )

    const handlePointerLeave = React.useCallback(
        (event: React.PointerEvent) => {
            if (event.pointerType === 'mouse') {
                scheduleClose()
            }
        },
        [scheduleClose],
    )

    React.useEffect(() => {
        return clearCloseTimer
    }, [clearCloseTimer])

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                clearCloseTimer()
                setOpen(nextOpen)
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    aria-label="Contact Me"
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    Contact Me
                    <span className="icon-[tabler--mail-fast] size-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                sideOffset={10}
                className="w-[min(calc(100vw-2rem),20rem)] p-2"
                onOpenAutoFocus={(event) => event.preventDefault()}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                <div className="overflow-hidden rounded-md border border-border/80 bg-background">
                    {connectLinks.map((item) => (
                        <a
                            key={item.link}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-border/70 px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                            onClick={() => setOpen(false)}
                        >
                            <span className="flex size-9 items-center justify-center rounded-md bg-muted text-xl text-foreground">
                                <BrandLogo icon={item.icon} className="size-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-medium text-foreground">{item.label}</span>
                                <span className="block truncate text-xs text-muted-foreground">{item.handle}</span>
                            </span>
                            <span className="icon-[tabler--external-link] size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </a>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
