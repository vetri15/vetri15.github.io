import { ThemeProvider } from '@/components/theme-provider'
import { BASE_URL, OPEN_GRAPH_IMAGE } from '@/config'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '@/styles/globals.css'
import { appendBaseUrl } from '@/utils/imagePath'

const inter = Inter({ subsets: ['latin'] })

const title = 'Vetri T'
const description =
    "👋Hi there, I'm Vetri, a passionate Java Developer with expertise in building scaleable solutions. Explore my portfolio and contact me on GitHub."
const url = BASE_URL

export const metadata: Metadata = {
    title: {
        template: `${title} - %s`,
        default: `${title} - Personal Website`,
    },
    description,
    authors: [
        {
            name: title,
            url,
        },
    ],
    icons: {
        icon: appendBaseUrl('/favicon.ico'),
        shortcut: appendBaseUrl('/favicon.ico'),
        apple: appendBaseUrl('/apple-touch-icon.png'),
        other: {
            rel: appendBaseUrl('apple-chrome-512x512'),
            url: appendBaseUrl('/android-chrome-512x512.png'),
        },
    },
    metadataBase: new URL(url),
    openGraph: {
        title: {
            template: `${title} - %s`,
            default: `${title} - Personal Website`,
        },
        description,
        url,
        siteName: title,
        images: [
            {
                url: appendBaseUrl(OPEN_GRAPH_IMAGE), // or an array of images
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
    themeColor: '#2563EB',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Update the maximumScale to allow zooming up to 5x
    userScalable: true, // Enable user scalability
}

interface RootLayoutProps {
    children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="keywords"
                    content="Vetri T, Backend Developer, Web Developer, Portfolio, GitHub"
                />

                {/* lazy loading images */}
                <script src="https://afarkas.github.io/lazysizes/lazysizes.min.js" async></script>
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
