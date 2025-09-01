import { Layout } from '@/components/layout'
import { Blog } from '@/components/sections/blog'
import { OPEN_GRAPH_IMAGE } from '@/config'
import { getBlogList, getBlogTags } from '@/lib/blog'
import { capitalize } from '@/utils/capitalize'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { appendBaseUrl } from '@/utils/imagePath'

interface BlogTagPageProps {
    params: {
        tag: string
    }
}

export const generateMetadata = async ({ params }: BlogTagPageProps): Promise<Metadata> => {
    const { tag } = params

    if (!tag) {
        return notFound()
    }

    const capita = capitalize(tag)

    const title = `Vetri's Blog - ${capita}`
    const description = `Explore a collection of articles and blog posts from vetri`

    return {
        title: {
            absolute: title,
        },
        description,
        openGraph: {
            title: {
                absolute: title,
            },
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
            title: {
                absolute: title,
            },
            description,
            images: [appendBaseUrl(OPEN_GRAPH_IMAGE)],
        },
    }
}

const BlogTagPage = async ({ params }: BlogTagPageProps) => {
    const { tag } = params

    if (!tag) {
        return notFound
    }

    const blogs = await getBlogList(tag)

    return (
        <Layout>
            <Blog blogs={blogs} tag={capitalize(tag)} />
        </Layout>
    )
}

export default BlogTagPage

export const generateStaticParams = async () => {
    const tags = await getBlogTags()

    return tags
}
