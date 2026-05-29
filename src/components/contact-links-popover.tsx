'use client'

import { useAppNotifier } from '@/components/app-notifier'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { connectLinks } from '@/data/connect-links'
import * as React from 'react'

export const ContactLinksPopover = () => {
    const { notify } = useAppNotifier()
    const [open, setOpen] = React.useState(false)
    const closeTimerRef = React.useRef<number | null>(null)

    const clearCloseTimer = React.useCallback(() => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }, [])

    const writeToClipboard = React.useCallback(async (link: string) => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(link)
            return
        }

        const textArea = document.createElement('textarea')
        textArea.value = link
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()

        const copied = document.execCommand('copy')
        textArea.remove()

        if (!copied) {
            throw new Error('Copy failed')
        }
    }, [])

    const copyLink = React.useCallback(
        async (label: string, link: string) => {
            try {
                await writeToClipboard(link)
                notify(`${label.toLowerCase()} link copied`)
            } catch {
                notify(`${label.toLowerCase()} link could not be copied`)
            }
        },
        [notify, writeToClipboard],
    )

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
                    <span className="icon-[tabler--share] size-6" />
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
                        <div
                            key={item.link}
                            className="grid grid-cols-[1fr_2.25rem] items-center border-b border-border/70 last:border-b-0"
                        >
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
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
                            <button
                                type="button"
                                className="mr-2 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-none"
                                aria-label={`Copy ${item.label} link`}
                                onClick={() => copyLink(item.label, item.link)}
                            >
                                <span className="icon-[tabler--copy] size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
