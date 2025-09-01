import { Layout } from '@/components/layout'
import { Blog } from '@/components/sections/blog'
import { OPEN_GRAPH_IMAGE } from '@/config'
import { getBlogList } from '@/lib/blog'
import type { Metadata } from 'next'
import { appendBaseUrl } from '@/utils/imagePath'

const title = 'Blog'
const description =
    'Explore a collection of articles and blog posts by Vetri. Discover a variety of topics, ranging from Java to AI'

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

const BlogPage = async () => {
    const blogs = await getBlogList()

    return (
        <Layout>
            <Blog blogs={blogs} />
        </Layout>
    )
}

export default BlogPage
