import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    mainClassName?: string
}

export const Layout = ({ children, className, mainClassName, ...props }: LayoutProps) => {
    return (
        <div className={cn('flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden', className)} {...props}>
            <Header />
            <main className={cn('container flex-1 space-y-10', mainClassName)}>{children}</main>
            <Footer />
        </div>
    )
}
