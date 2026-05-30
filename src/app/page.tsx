import { ContactLinksPopover } from '@/components/contact-links-popover'
import FadeInSection from '@/components/fade-in-section'
import { Layout } from '@/components/layout'
import { LinkDock } from '@/components/link-dock'
import { LinkedinQrFlipCard } from '@/components/linkedin-qr-flip-card'
import { RecruiterSnapshot } from '@/components/recruiter-snapshot'
import { AboutPrimaryContent, AboutSecondaryContent } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { FeaturedProjectsGrid } from '@/components/sections/projects'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { connectLinks } from '@/data'
import { appendBaseUrl } from '@/utils/imagePath'
import NextLink from 'next/link'

const recruiterSnapshot = [
    {
        label: 'Primary stack',
        value: 'Java, Spring Boot',
    },
    {
        label: 'Focus',
        value: 'REST APIs & Microservices',
    },
    {
        label: 'Domain',
        value: 'CRM workflows',
    },
    {
        label: 'Experience',
        value: '1.6+ years',
    },
    {
        label: 'Seeking',
        value: 'Backend Developer roles',
    },
]

const HomePage = () => {
    const profileImg = appendBaseUrl('/images/profile.webp')
    const linkedinUrl = connectLinks.find((item) => item.label === 'LinkedIn')?.link ?? 'https://www.linkedin.com/'

    return (
        <Layout mainClassName="w-full max-w-[96rem] space-y-10 px-4 sm:px-6 lg:px-6 xl:px-8">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="lg:col-span-2">
                    <FadeInSection>
                        <section className="flex flex-col-reverse items-center gap-8 pb-6 pt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-12">
                            <div className="flex max-w-3xl flex-col items-center space-y-6 text-center lg:max-w-none lg:items-start lg:text-left">
                                <div className="flex items-baseline space-x-1 space-y-6 lg:flex-col lg:space-x-0">
                                    <Typography
                                        variant="h1"
                                        className="text-2xl font-bold leading-none tracking-tight sm:text-3xl md:text-3xl lg:text-5xl"
                                    >
                                        Hi, I&apos;m{' '}
                                        <span className="title-highlight title-highlight-primary">Vetri T</span>
                                    </Typography>
                                </div>
                                <p className="supporting-copy max-w-2xl text-lg">
                                    Backend Developer with experience in Java and Spring Boot, building scalable REST
                                    APIs, microservices, and backend systems for complex business flows. Experienced in
                                    clean architecture, performance optimization, maintainability, and production-ready
                                    solutions. Actively exploring cloud, DevOps, and AI-driven backend development to
                                    build more scalable and intelligent backend systems.
                                </p>

                                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                                    <NextLink href="/projects">
                                        <Button className="text-primary-foreground" aria-label="View Projects">
                                            View Projects
                                        </Button>
                                    </NextLink>
                                    <ContactLinksPopover />
                                </div>
                                <RecruiterSnapshot items={recruiterSnapshot} />
                            </div>
                            <div className="flex w-full justify-center lg:justify-center">
                                <LinkedinQrFlipCard
                                    profileImageSrc={profileImg}
                                    linkedinUrl={linkedinUrl}
                                    className="size-[300px] md:size-[450px] lg:size-[500px]"
                                    showFlipHint={false}
                                />
                            </div>
                        </section>
                    </FadeInSection>
                </div>
                <section id="about" className="pb-4 pt-0 lg:py-4">
                    <AboutPrimaryContent alignTitle="start" />
                </section>
                <section className="py-4 lg:h-full">
                    <AboutSecondaryContent />
                </section>
                <div className="lg:col-span-2">
                    <FeaturedProjectsGrid id="projects" />
                </div>
                <div className="lg:col-span-2">
                    <FadeInSection>
                        <Contact id="contact" />
                    </FadeInSection>
                </div>
            </div>
            <LinkDock />
        </Layout>
    )
}

export default HomePage
