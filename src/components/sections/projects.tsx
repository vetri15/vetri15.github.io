'use client'

import { Typography } from '@/components/typography'
import { useActiveHomeSection } from '@/hooks/use-active-home-section'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { projects } from '@/data'
import { cn } from '@/lib/utils'
import { appendBaseUrl } from '@/utils/imagePath'
import Image from 'next/image'
import NextLink from 'next/link'
import FadeInSection from '../fade-in-section'

export interface ProjectsSectionProps {
    featured?: boolean
    id?: string
}

type Project = (typeof projects)[number]

interface ProjectCardProps {
    project: Project
    className?: string
    useFullWidthLayout?: boolean
}

const ProjectsHeader = ({
    featured,
    shouldAnimateGithubLink,
}: {
    featured?: boolean
    shouldAnimateGithubLink: boolean
}) => {
    return (
        <div className="flex flex-col items-center gap-3 border-b pb-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <Typography className="title-highlight sm:col-start-2 sm:justify-self-center" variant="h1">
                <span className="title-highlight-emoji" aria-hidden="true">{'\u{1F680}'}</span>
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
    )
}

const ProjectCard = ({ project, className, useFullWidthLayout = project.isFullWidth }: ProjectCardProps) => {
    return (
        <Card className={className}>
            <div className={cn('flex h-full flex-col justify-between', useFullWidthLayout && 'md:flex-row')}>
                <div className={useFullWidthLayout ? 'basis-1/2' : ''}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
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
                <div className={cn('px-6', useFullWidthLayout ? 'basis-1/2 py-6 md:pr-6' : 'pb-6')}>
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
    )
}

export const Projects = ({ featured, id }: ProjectsSectionProps) => {
    const activePath = useActiveHomeSection()
    const shouldAnimateGithubLink = Boolean(featured) && activePath === '/projects'

    return (
        <section id={id} className="flex flex-col space-y-8 py-4">
            <ProjectsHeader featured={featured} shouldAnimateGithubLink={shouldAnimateGithubLink} />
            <h2 className="text-lg text-muted-foreground">
                Here are some of the projects I&apos;ve worked on. You can find more on my GitHub profile.
            </h2>
            <div className="flex h-full w-full flex-wrap justify-between gap-4">
                {projects
                    .filter((project) => (featured ? project.isFeatured : true))
                    .map((project) => (
                        <FadeInSection key={project.title}>
                            <ProjectCard
                                project={project}
                                className={project.isFullWidth ? 'w-full' : 'md:basis-[calc(50%-0.5rem)]'}
                            />
                        </FadeInSection>
                    ))}
            </div>
        </section>
    )
}

export const FeaturedProjectsGrid = ({ id }: { id?: string }) => {
    const activePath = useActiveHomeSection()
    const featuredProjects = projects.filter((project) => project.isFeatured)

    return (
        <section id={id} className="flex flex-col space-y-8 py-4">
            <ProjectsHeader featured shouldAnimateGithubLink={activePath === '/projects'} />
            <h2 className="text-lg text-muted-foreground">
                Here are some of the projects I&apos;ve worked on. You can find more on my GitHub profile.
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {featuredProjects.map((project) => (
                    <FadeInSection key={project.title}>
                        <ProjectCard project={project} className="h-full" useFullWidthLayout={false} />
                    </FadeInSection>
                ))}
            </div>
        </section>
    )
}
