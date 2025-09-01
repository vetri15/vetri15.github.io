import { Layout } from '@/components/layout'
import { About } from '@/components/sections/about'
import { OPEN_GRAPH_IMAGE } from '@/config'
import type { Metadata } from 'next'
import { appendBaseUrl } from '@/utils/imagePath'

const title = 'About Me'
const description =
    'Learn more about Vetri T, a backend developer'

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

const AboutPage = () => {
    return (
        <Layout>
            <About />
        </Layout>
    )
}

export default AboutPage
