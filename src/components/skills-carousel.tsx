'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { skills } from '@/data'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export const SkillsCarousel = () => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnHover: true }))

    return (
        <Carousel opts={{ align: 'start', loop: true }} plugins={[plugin.current]}>
  <CarouselContent className="-ml-1">
    {skills.map((skill) => (
      <CarouselItem key={skill.title} className="pl-1 md:basis-1/2 lg:basis-1/3">
        <div className="h-full p-1">
          {/* Gradient border wrapper */}
          <div
            className={[
              "h-full rounded-2xl p-[1.5px]",
              skill.highlight
                ? "bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500"
                : "bg-border dark:bg-border"
            ].join(" ")}
          >
            <Card className="flex h-full flex-col rounded-2xl border-0 bg-background shimmer">
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
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

    )
}
