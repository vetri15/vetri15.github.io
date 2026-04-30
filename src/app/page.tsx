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

const HomePage = () => {
    const profileImg = appendBaseUrl('/images/profile.webp')

    return (
        <Layout mainClassName="w-full max-w-[96rem] space-y-10 px-4 sm:px-6 lg:px-6 xl:px-8">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="lg:col-span-2">
                    <FadeInSection>
                        <section className="flex flex-col-reverse items-center justify-between gap-4 py-12 lg:flex-row lg:gap-10">
                            <div className="flex max-w-3xl flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
                                <div className="flex items-baseline space-x-1 space-y-6 lg:flex-col lg:space-x-0">
                                    <Typography
                                        variant="h1"
                                        className="text-base font-bold leading-none tracking-tight sm:text-xl md:text-3xl lg:text-5xl"
                                    >
                                        Hi, I&apos;m <span className="title-highlight title-highlight-primary">Vetri T</span>
                                    </Typography>
                                </div>
                                <p className="supporting-copy max-w-2xl">
                                    I&apos;m a Backend developer specializing in Java and Spring Boot. I build REST APIs, microservices, and backend systems with clean architecture. Exploring cloud, DevOps, and AI
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
                            </div>
                            <Image
                                src={profileImg}
                                alt="Profile"
                                width={500}
                                height={500}
                                className="size-[300px] rounded-xl md:size-[450px] lg:size-[500px]"
                                priority
                            />
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
