import { BrandLogo } from '@/components/brand-logo'
import Marquee from '@/components/ui/marquee'
import { skills } from '@/data'
import { splitIntoThree } from '@/lib/arraySplitter'
import { cn } from '@/lib/utils'
import { LogoItem } from '@/types/logo'

const LogoCard = ({ name, icon, group }: LogoItem) => {
    const groupAccentClasses: Record<string, string> = {
        'Front End Development': 'border-rose-500/20 bg-rose-500/5',
        'Backend Development': 'border-blue-500/20 bg-blue-500/5',
        'Data Analysis': 'border-amber-500/20 bg-amber-500/5',
        'CRM Development': 'border-indigo-500/20 bg-indigo-500/5',
    }

    const accentClass = groupAccentClasses[group] || 'border-border/70 bg-background'

    return (
        <figure
            aria-label={`${name} logo`}
            className={cn(
                'flex size-20 items-center justify-center rounded-lg border shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md sm:size-24',
                accentClass,
            )}
        >
            <BrandLogo icon={icon} className="size-8 sm:size-9" />
        </figure>
    )
}

export function VerticalMarquee() {
    const logos: LogoItem[] = skills.reduce((accum: LogoItem[], i) => {
        const itemsWithTitle: LogoItem[] = i.items.map((item) => ({
            ...item,
            group: i.title, // attach parent title
        }))

        return accum.concat(itemsWithTitle)
    }, [])

    const logoGroups = splitIntoThree(logos)

    return (
        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-lg border border-border/70 bg-background/80 p-3 shadow-sm">
                <div className="relative flex h-[360px] w-full flex-row items-center justify-center gap-3 overflow-hidden rounded-md bg-muted/30 p-2 sm:h-[420px] lg:h-[480px] lg:gap-6">
                    <Marquee
                        reverse
                        vertical
                        pauseOnHover
                        className="[--duration:16s] [--gap:0.75rem] items-center justify-center"
                    >
                        {logoGroups[0].map((logo, i) => (
                            <LogoCard key={i} {...logo} />
                        ))}
                    </Marquee>

                    <Marquee
                        vertical
                        pauseOnHover
                        className="[--duration:18s] [--gap:0.75rem] items-center justify-center"
                    >
                        {logoGroups[1].map((logo, i) => (
                            <LogoCard key={i} {...logo} />
                        ))}
                    </Marquee>

                    <Marquee
                        reverse
                        vertical
                        pauseOnHover
                        className="[--duration:16s] [--gap:0.75rem] items-center justify-center"
                    >
                        {logoGroups[2].map((logo, i) => (
                            <LogoCard key={i} {...logo} />
                        ))}
                    </Marquee>

                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-md bg-gradient-to-b from-background via-background/80 to-transparent dark:from-background" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-md bg-gradient-to-t from-background via-background/80 to-transparent dark:from-background" />
                </div>
            </div>
        </div>
    )
}
