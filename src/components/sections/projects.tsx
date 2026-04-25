'use client'

import { Typography } from '@/components/typography'
import { useActiveHomeSection } from '@/hooks/use-active-home-section'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { projects } from '@/data'
import Image from 'next/image'
import NextLink from 'next/link'
import { appendBaseUrl } from '@/utils/imagePath'
import FadeInSection from '../fade-in-section'

export interface ProjectsSectionProps {
    featured?: boolean
    id?: string
}

export const Projects = ({ featured, id }: ProjectsSectionProps) => {
    const activePath = useActiveHomeSection()
    const shouldAnimateGithubLink = featured && activePath === '/projects'

    return (
        <section id={id} className="flex flex-col space-y-8 py-4">
            <div className="flex flex-col items-center gap-3 border-b pb-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Typography className="title-highlight sm:col-start-2 sm:justify-self-center" variant="h1">
                    <span className="title-highlight-emoji" aria-hidden="true">🚀</span>
                    {featured && 'Featured '}Projects
                </Typography>
                <NextLink
                    href="https://github.com/vetri15"
                    className={`group flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary sm:col-start-3 sm:justify-self-end sm:text-sm ${
                        shouldAnimateGithubLink ? 'github-link-bounce' : ''
                    }`}
                    target="_blank"
                    aria-label="View on GitHub"
                >
                    <span className="sm:hidden">GitHub Link</span>
                    <span className="hidden sm:inline">View on GitHub</span>
                    <span className="icon-[tabler--arrow-right] size-6 transition-transform duration-200 group-hover:translate-x-1" />
                </NextLink>
            </div>
            <h2 className="text-lg text-muted-foreground">
                Here are some of the projects I&apos;ve worked on. You can find more on my GitHub profile.
            </h2>
            <div className="flex h-full w-full flex-wrap justify-between gap-4">
                {projects
                    .filter((project) => (featured ? project.isFeatured : true))
                    .map((project) => (
                        <FadeInSection key={project.title}>
                        <Card
                            
                            className={project.isFullWidth ? 'w-full' : 'md:basis-[calc(50%-0.5rem)]'}
                        >
                            <div
                                className={`flex h-full flex-col justify-between ${project.isFullWidth && 'md:flex-row'}`}
                            >
                                <div className={project.isFullWidth ? 'basis-1/2' : ''}>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>{project.title}</CardTitle>
                                        {project.note && (
                                            <Badge variant="secondary" className="rounded-full">
                                                {project.note}
                                            </Badge>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{project.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        {project.status.link ? (
                                            <NextLink
                                                href={project.status.link}
                                                target="_blank"
                                                className="flex items-center space-x-2 hover:underline"
                                            >
                                                <p>{project.status.text}</p>
                                                {project.status.icon && <span className={project.status.icon} />}
                                            </NextLink>
                                        ) : (
                                            <>
                                                <p>{project.status.text}</p>
                                                {project.status.icon && <span className={project.status.icon} />}
                                            </>
                                        )}
                                    </CardFooter>
                                </div>
                                <div className={`px-6 ${project.isFullWidth ? 'basis-1/2 py-6 md:pr-6' : 'pb-6'}`}>
                                    <Image
                                        src={appendBaseUrl(project.image)}
                                        alt={project.title}
                                        width={500}
                                        height={500}
                                        className="rounded object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </Card>
                        </FadeInSection>
                    ))}
            </div>
        </section>
    )
}
