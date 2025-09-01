import { Layout } from '@/components/layout'
import { Contact } from '@/components/sections/contact'
import { OPEN_GRAPH_IMAGE } from '@/config'
import type { Metadata } from 'next'
import { appendBaseUrl } from '@/utils/imagePath'

const title = "Let's Connect"
const description =
    'Get in touch with Vetri, a passionate Full Stack Developer. Reach out to discuss projects, collaborations, or anything else.'

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

const ContactPage = () => {
    return (
        <Layout>
            <Contact />
        </Layout>
    )
}

export default ContactPage
