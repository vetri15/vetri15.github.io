'use client'

import { getLogoDefinition } from '@/data/logo-library'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

interface BrandLogoProps {
    icon: string
    className?: string
}

export const BrandLogo = ({ icon, className }: BrandLogoProps) => {
    const logo = getLogoDefinition(icon)

    if (logo?.provider === 'iconify-icons') {
        if (logo.dark) {
            return (
                <>
                    <Icon
                        aria-hidden="true"
                        icon={logo.light.icon}
                        className={cn('inline-block dark:hidden', logo.light.className, className)}
                    />
                    <Icon
                        aria-hidden="true"
                        icon={logo.dark.icon}
                        className={cn('hidden dark:inline-block', logo.dark.className, className)}
                    />
                </>
            )
        }

        return (
            <Icon
                aria-hidden="true"
                icon={logo.light.icon}
                className={cn('inline-block', logo.light.className, className)}
            />
        )
    }

    return <span aria-hidden="true" className={cn(icon, className)} />
}
