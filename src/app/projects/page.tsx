import { Layout } from '@/components/layout'
import { Projects } from '@/components/sections/projects'
import { OPEN_GRAPH_IMAGE } from '@/config'
import type { Metadata } from 'next'
import { appendBaseUrl } from '@/utils/imagePath'

const title = 'Projects'
const description =
    'Explore a collection of innovative projects by Vetri T.'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: [
            {
                url: appendBaseUrl(OPEN_GRAPH_IMAGE),
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        title,
        description,
        images: [appendBaseUrl(OPEN_GRAPH_IMAGE)],
    },
}

const ProjectsPage = () => {
    return (
        <Layout>
            <Projects />
        </Layout>
    )
}

export default ProjectsPage
