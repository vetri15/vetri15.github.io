import { SkillsCarousel } from '@/components/skills-carousel'
import { Typography } from '@/components/typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { certification, education, experience } from '@/data'

export const About = () => {
    return (
        <section className="flex flex-col space-y-8 py-4">
            <Typography variant="h1" underline>
                📝 About Me
            </Typography>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">Summary</Typography>
                <p className="text-lg text-muted-foreground">
                    Spring Boot developer with experience in designing and scaling microservices-based applications. Proficient in Java, Spring ecosystem, and cloud-native development. Focused on delivering high-quality backend solutions that drive business value.
                </p>
            </div>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">Education</Typography>
                <div className="flex flex-col gap-3">
                    {education.map((item) => (
                        <div key={item.title} className="flex flex-col space-y-2 border-l-4 border-primary pl-4">
                            <Typography variant="h3">{item.title}</Typography>
                            <p className="text-md text-muted-foreground">{item.subtitle}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">Work Experience</Typography>
                <div className="flex flex-col gap-3">
                    {experience.map((item) => (
                        <div key={item.title} className="flex flex-col space-y-2 border-l-4 border-primary pl-4">
                            <Typography variant="h3">{item.title}</Typography>
                            <p className="text-md text-muted-foreground">{item.subtitle}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">Certifications</Typography>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {certification.map((item) => (
                        <Card key={item.title} className="w-full">
                            <CardHeader>
                                <div className="flex justify-center flex-wrap gap-2">
                                            <span key={item.icon} className={`${item.icon} size-6`} />
                                    </div>
                                
                            </CardHeader>
                            {/* <CardContent>
                                <CardDescription>{item.description}</CardDescription>
                            </CardContent> */}
                            <CardFooter className=" justify-center mt-auto">
                                    <CardTitle>{item.title}</CardTitle>
                                </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-6">
                <Typography variant="h2">My Skills</Typography>
                <SkillsCarousel />
            </div>
        </section>
    )
}
