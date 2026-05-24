import { DesktopNav } from '@/components/layout/desktop-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Typography } from '@/components/typography'
import Image from 'next/image'
import NextLink from 'next/link'

export const Header = () => {
    return (
        <header className="sticky left-0 top-0 z-10 h-20 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-full items-center justify-between py-3">
                <NextLink href="/" aria-label="Vetri T" className="flex items-center gap-2">
                    <span className="logo-mark">
                        <span className="logo-mark-inner">
                            <Image
                                src="/apple-touch-icon.png"
                                alt=""
                                width={40}
                                height={40}
                                className="size-10 shrink-0 object-contain"
                            />
                        </span>
                    </span>
                    <Typography variant="h1">Vetri T</Typography>
                </NextLink>
                <DesktopNav />
                <MobileNav />
            </div>
        </header>
    )
}
