'use client'

import { BrandLogo } from '@/components/brand-logo'
import { Typography } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { projects, type Project } from '@/data'
import { useActiveHomeSection } from '@/hooks/use-active-home-section'
import { cn } from '@/lib/utils'
import { appendBaseUrl } from '@/utils/imagePath'
import Image from 'next/image'
import NextLink from 'next/link'
import FadeInSection from '../fade-in-section'

export interface ProjectsSectionProps {
    featured?: boolean
    id?: string
}

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

interface ProjectDetailListProps {
    title: string
    items: string[]
    iconClassName?: string
}

const ProjectDetailList = ({ title, items, iconClassName = 'icon-[tabler--circle-check]' }: ProjectDetailListProps) => {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {items.map((item) => (
                    <li className="flex gap-2" key={item}>
                        <span className={cn(iconClassName, 'mt-0.5 size-4 shrink-0 text-primary')} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ProjectCard = ({ project, className, useFullWidthLayout = project.isFullWidth ?? false }: ProjectCardProps) => {
    return (
        <Card className={cn('overflow-hidden', className)}>
            <div className={cn('flex h-full flex-col justify-between', useFullWidthLayout && 'md:flex-row')}>
                <div className={cn('flex flex-1 flex-col', useFullWidthLayout && 'md:basis-3/5')}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
                        <CardTitle>{project.title}</CardTitle>
                        {project.note && (
                            <Badge variant="secondary" className="rounded-full">
                                {project.note}
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-5">
                        <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">Tech stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((technology) => (
                                    <Badge key={technology} variant="outline" className="rounded-full">
                                        {technology}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <ProjectDetailList title="Key features" items={project.keyFeatures} />
                            <ProjectDetailList
                                title="Impact"
                                items={project.impact}
                                iconClassName="icon-[tabler--chart-line]"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                        {project.liveDemoUrl && (
                            <Button asChild size="sm">
                                <NextLink
                                    href={project.liveDemoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Open live demo for ${project.title}`}
                                >
                                    <span className="icon-[tabler--external-link] mr-2 size-4" />
                                    Live Demo
                                </NextLink>
                            </Button>
                        )}
                        <Button asChild size="sm" variant="outline">
                            <NextLink
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open GitHub repository for ${project.title}`}
                            >
                                <BrandLogo icon="icon-[simple-icons--github]" className="mr-2 size-4" />
                                GitHub
                            </NextLink>
                        </Button>
                    </CardFooter>
                </div>
                <div className={cn('px-6', useFullWidthLayout ? 'pb-6 md:basis-2/5 md:py-6 md:pl-0' : 'pb-6')}>
                    <div className="flex aspect-[16/10] h-full min-h-52 items-center justify-center overflow-hidden rounded-md bg-secondary/40 p-3">
                        <Image
                            src={appendBaseUrl(project.image)}
                            alt={project.title}
                            width={500}
                            height={500}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </div>
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
