import FadeInSection from '@/components/fade-in-section'
import { Layout } from '@/components/layout'
import { LinkDock } from '@/components/link-dock'
import { AboutPrimaryContent, AboutSecondaryContent } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { FeaturedProjectsGrid } from '@/components/sections/projects'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { appendBaseUrl } from '@/utils/imagePath'
import Image from 'next/image'
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
        value: '1.5+ years',
    },
    {
        label: 'Seeking',
        value: 'Backend Developer roles',
    },
]

const HomePage = () => {
    const profileImg = appendBaseUrl('/images/profile.webp')

    return (
        <Layout mainClassName="w-full max-w-[96rem] space-y-10 px-4 sm:px-6 lg:px-6 xl:px-8">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="lg:col-span-2">
                    <FadeInSection>
                        <section className="flex flex-col-reverse items-center gap-8 py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
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
                                    Backend Developer specializing in Java and Spring Boot, building scalable REST APIs,
                                    Microservices, and backend systems for complex business flows. Focused on clean
                                    architecture, performance, maintainability, and production-ready solutions.
                                    Exploring cloud, DevOps, and AI-driven backend development.
                                </p>

                                <div className="flex space-x-4">
                                    <NextLink href="/projects">
                                        <Button className="text-primary-foreground" aria-label="View Projects">
                                            View Projects
                                        </Button>
                                    </NextLink>
                                    <NextLink href="/contact">
                                        <Button variant="outline" className="gap-2" aria-label="Contact Me">
                                            Contact Me
                                            <span className="icon-[tabler--mail-fast] size-6" />
                                        </Button>
                                    </NextLink>
                                </div>
                                <div className="w-full max-w-2xl rounded-lg border bg-card/50 px-4 py-3 text-left shadow-sm">
                                    <p className="text-sm font-semibold text-foreground">Recruiter snapshot</p>
                                    <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                        {recruiterSnapshot.map((item) => (
                                            <div key={item.label} className="flex items-baseline gap-1.5">
                                                <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                                    {item.label}
                                                    <span className="sr-only">:</span>
                                                </dt>
                                                <dd className="font-medium text-foreground">{item.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                            <div className="flex w-full justify-center lg:justify-center">
                                <Image
                                    src={profileImg}
                                    alt="Profile"
                                    width={500}
                                    height={500}
                                    className="size-[300px] rounded-xl md:size-[450px] lg:size-[500px]"
                                    priority
                                />
                            </div>
                        </section>
                    </FadeInSection>
                </div>
                <section id="about" className="py-4">
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
