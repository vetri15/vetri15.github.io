import { DesktopNav } from '@/components/layout/desktop-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Typography } from '@/components/typography'
import Image from 'next/image'
import NextLink from 'next/link'

export const Header = () => {
    return (
        <header className="sticky left-0 top-0 z-10 min-h-[80px] w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-full items-center justify-between">
                <NextLink href="/" aria-label="Vetri T" className="flex items-center gap-2">
                    <Image src="/apple-touch-icon.png" alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
                    <Typography variant="h1">Vetri T</Typography>
                </NextLink>
                <DesktopNav />
                <MobileNav />
            </div>
        </header>
    )
}
