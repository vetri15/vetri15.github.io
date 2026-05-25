'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RecruiterSnapshotItem {
    label: string
    value: string
}

interface RecruiterSnapshotProps {
    items: RecruiterSnapshotItem[]
}

export const RecruiterSnapshot = ({ items }: RecruiterSnapshotProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full max-w-2xl rounded-lg border bg-card/50 px-4 py-3 text-left shadow-sm">
            <button
                type="button"
                className="flex w-full items-center justify-between gap-3 text-left"
                onClick={() => setIsOpen((currentValue) => !currentValue)}
                aria-expanded={isOpen}
                aria-controls="recruiter-snapshot-details"
            >
                <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">Recruiter snapshot</span>
                    <span className="text-sm text-muted-foreground">
                        Java backend | 1.6+ yrs | Open to Backend roles
                    </span>
                </span>
                <span
                    className={cn(
                        'icon-[tabler--chevron-down] size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out motion-reduce:transition-none',
                        isOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                />
            </button>
            <div
                id="recruiter-snapshot-details"
                className={cn(
                    'overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none',
                    isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
                )}
                aria-hidden={!isOpen}
            >
                <dl className="mt-3 divide-y border-t pt-3 text-sm">
                    {items.map((item) => (
                        <div
                            key={item.label}
                            className="grid grid-cols-[6.5rem_1fr] gap-3 py-1 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr]"
                        >
                            <dt className="text-xs font-semibold uppercase leading-5 text-muted-foreground">
                                {item.label}
                                <span className="sr-only">:</span>
                            </dt>
                            <dd className="font-medium leading-5 text-foreground">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
