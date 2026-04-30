'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { skills } from '@/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'

export const SkillsCarousel = () => {
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const plugin = useRef(
        Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            stopOnLastSnap: false,
        }),
    )
    const carouselSkills = [...skills, ...skills]
    const [showControls, setShowControls] = useState(false)

    const clearControlsTimer = () => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
            controlsTimeoutRef.current = null
        }
    }

    const revealControls = () => {
        clearControlsTimer()
        setShowControls(true)
    }

    const hideControlsWithDelay = () => {
        clearControlsTimer()
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
        }, 1200)
    }

    useEffect(() => {
        return () => {
            clearControlsTimer()
        }
    }, [])

    return (
        <Carousel
            opts={{ align: 'start', loop: true }}
            plugins={[plugin.current]}
            className="group relative"
            onMouseEnter={revealControls}
            onMouseLeave={hideControlsWithDelay}
            onFocusCapture={revealControls}
            onBlurCapture={hideControlsWithDelay}
            onTouchStart={revealControls}
            onTouchEnd={hideControlsWithDelay}
        >
            <CarouselContent className="-ml-1">
                {carouselSkills.map((skill, index) => (
                    <CarouselItem key={`${skill.title}-${index}`} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="h-full p-1">
                            <div
                                className={[
                                    'h-full rounded-2xl p-[1.5px]',
                                    skill.highlight
                                        ? 'bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500'
                                        : 'bg-border dark:bg-border',
                                ].join(' ')}
                            >
                                <Card className="flex h-full min-h-[220px] flex-col rounded-2xl border-0 bg-background shimmer">
                                    <CardHeader>
                                        <CardTitle>{skill.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{skill.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter className="mt-auto">
                                        <div className="flex flex-wrap gap-2">
                                            {skill.items.map((item) => (
                                                <span key={item.name} className={`${item.icon} size-6`} />
                                            ))}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
                className={`left-3 h-10 w-10 border border-border/70 bg-background/75 text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-foreground focus-visible:bg-background dark:bg-background/60 ${
                    showControls
                        ? 'pointer-events-auto translate-x-0 opacity-100'
                        : 'pointer-events-none -translate-x-1 opacity-0'
                }`}
            />
            <CarouselNext
                className={`right-3 h-10 w-10 border border-border/70 bg-background/75 text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-foreground focus-visible:bg-background dark:bg-background/60 ${
                    showControls
                        ? 'pointer-events-auto translate-x-0 opacity-100'
                        : 'pointer-events-none translate-x-1 opacity-0'
                }`}
            />
        </Carousel>
    )
}
