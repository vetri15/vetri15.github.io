import { BrandLogo } from '@/components/brand-logo'
import { LinkedinQrFlipCard } from '@/components/linkedin-qr-flip-card'
import { Typography } from '@/components/typography'
import { VerticalMarquee } from '@/components/vertical-marquee'
import { connectLinks } from '@/data'
import { appendBaseUrl } from '@/utils/imagePath'
import FadeInSection from '../fade-in-section'

interface ContactProps {
    id?: string
}

export const Contact = ({ id }: ContactProps) => {
    const linkedinUrl = connectLinks.find((item) => item.label === 'LinkedIn')?.link ?? 'https://www.linkedin.com/'

    return (
        <section id={id} className="flex flex-col gap-10 pb-20 pt-6">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
                <Typography className="title-highlight" variant="h2" underline>
                    Let&apos;s Connect
                </Typography>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Open to backend roles, Java/Spring Boot work, and conversations around building reliable systems.
                </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                <div className="flex justify-center lg:justify-end">
                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-2 shadow-sm">
                        <LinkedinQrFlipCard
                            profileImageSrc={appendBaseUrl('/images/profile.webp')}
                            linkedinUrl={linkedinUrl}
                            className="lg:size-[360px]"
                        />
                    </div>
                </div>
                <div className="mx-auto flex w-full max-w-xl flex-col gap-5 lg:mx-0">
                    <div className="border-l-2 border-primary/70 pl-4">
                        <p className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                            Choose the most relevant channel.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-border/70 bg-background/80">
                        {connectLinks.map((item) => (
                            <a
                                key={item.link}
                                href={item.link}
                                className="group flex items-center justify-between gap-4 border-b border-border/70 px-4 py-4 transition-colors last:border-b-0 hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label}
                            >
                                <span className="flex min-w-0 items-center gap-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                                        <BrandLogo icon={item.icon} className="size-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-foreground">
                                            {item.label}
                                        </span>
                                        <span className="block truncate text-sm text-muted-foreground">
                                            {item.handle}
                                        </span>
                                    </span>
                                </span>
                                <span className="icon-[tabler--arrow-up-right] size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <FadeInSection>
                <VerticalMarquee />
            </FadeInSection>
        </section>
    )
}
