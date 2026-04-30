import { SkillsCarousel } from '@/components/skills-carousel'
import { Typography } from '@/components/typography'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { certification, education, experience } from '@/data'
import FadeInSection from '../fade-in-section'

interface AboutProps {
    id?: string
}

interface AboutTimelineItem {
    title: string
    subtitle: string
    description: string
}

interface AboutPrimaryContentProps {
    alignTitle?: 'center' | 'start'
}

const AboutTitle = ({ alignTitle = 'center' }: AboutPrimaryContentProps) => {
    return (
        <FadeInSection>
            <div className={alignTitle === 'start' ? 'flex justify-center lg:justify-start' : 'flex justify-center'}>
                <Typography className="title-highlight" variant="h1" underline>
                    <span className="title-highlight-emoji" aria-hidden="true">{'\u{1F4DD}'}</span>
                    About Me
                </Typography>
            </div>
        </FadeInSection>
    )
}

const AboutTimelineSection = ({ title, items }: { title: string; items: AboutTimelineItem[] }) => {
    return (
        <FadeInSection>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">{title}</Typography>
                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <div key={item.title} className="flex flex-col space-y-2 border-l-4 border-primary pl-4">
                            <Typography variant="h3">{item.title}</Typography>
                            <p className="text-md text-muted-foreground">{item.subtitle}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </FadeInSection>
    )
}

export const AboutPrimaryContent = ({ alignTitle = 'center' }: AboutPrimaryContentProps) => {
    return (
        <div className="flex flex-col space-y-8">
            <AboutTitle alignTitle={alignTitle} />
            <FadeInSection>
                <div className="flex flex-col space-y-6">
                    <Typography variant="h2">Summary</Typography>
                    <p className="text-lg text-muted-foreground">
                        Spring Boot developer with experience in designing and scaling microservices-based applications. Proficient in Java, Spring ecosystem, and cloud-native development. Focused on delivering high-quality backend solutions that drive business value.
                    </p>
                </div>
            </FadeInSection>
            <AboutTimelineSection title="Education" items={education} />
            <AboutTimelineSection title="Work Experience" items={experience} />
        </div>
    )
}

export const AboutSecondaryContent = () => {
    return (
        <div className="flex flex-col space-y-8 lg:h-full lg:justify-between">
            <FadeInSection>
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-center">
                        <Typography variant="h2">Certifications</Typography>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {certification.map((item) => (
                            <Card key={item.title} className="w-full">
                                <CardHeader>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className={`${item.icon} size-6`} />
                                    </div>
                                </CardHeader>
                                <CardFooter className="mt-auto justify-center">
                                    <CardTitle>{item.title}</CardTitle>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </FadeInSection>
            <FadeInSection>
                <div className="flex flex-col space-y-6 lg:flex-1">
                    <div className="flex justify-center">
                        <Typography variant="h2">My Skills</Typography>
                    </div>
                    <FadeInSection>
                        <SkillsCarousel />
                    </FadeInSection>
                </div>
            </FadeInSection>
        </div>
    )
}

export const About = ({ id }: AboutProps) => {
    return (
        <section id={id} className="flex flex-col space-y-8 py-4">
            <AboutPrimaryContent />
            <AboutSecondaryContent />
        </section>
    )
}
