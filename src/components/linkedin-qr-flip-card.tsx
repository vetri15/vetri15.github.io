'use client'

import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface LinkedinQrFlipCardProps {
    profileImageSrc: string
    linkedinUrl: string
    className?: string
}

export const LinkedinQrFlipCard = ({ profileImageSrc, linkedinUrl, className }: LinkedinQrFlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className={cn('size-[260px] [perspective:1200px] sm:size-[320px] md:size-[360px]', className)}>
            <div
                className={cn(
                    'relative size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none',
                    isFlipped && '[transform:rotateY(180deg)]',
                )}
            >
                <button
                    type="button"
                    className="group absolute inset-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [backface-visibility:hidden]"
                    onClick={() => setIsFlipped(true)}
                    aria-label="Show LinkedIn QR code"
                    aria-hidden={isFlipped}
                    tabIndex={isFlipped ? -1 : 0}
                >
                    <Image
                        src={profileImageSrc}
                        alt="Profile"
                        width={500}
                        height={500}
                        className="size-full object-cover"
                        priority
                    />
                    <span className="absolute inset-x-6 bottom-6 rounded-md bg-background/90 px-3 py-2 text-sm font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Show LinkedIn QR
                    </span>
                </button>

                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-3 text-center text-card-foreground shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] sm:gap-4 sm:p-5"
                    aria-hidden={!isFlipped}
                >
                    <div className="flex items-center gap-2">
                        <BrandLogo icon="icon-[simple-icons--linkedin]" className="size-5" />
                        <p className="text-sm font-semibold text-foreground">LinkedIn QR</p>
                    </div>
                    <Image
                        src="/images/linkedin-qr.svg"
                        alt="QR code for Vetri T LinkedIn profile"
                        width={260}
                        height={260}
                        className="size-40 rounded-lg border border-border bg-white p-2 shadow-sm sm:size-52 sm:p-3"
                    />
                    <p className="hidden text-sm text-muted-foreground sm:block">Scan to open my LinkedIn profile.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Button asChild size="sm">
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={isFlipped ? 0 : -1}
                            >
                                Open LinkedIn
                            </a>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFlipped(false)}
                            tabIndex={isFlipped ? 0 : -1}
                        >
                            Flip back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
