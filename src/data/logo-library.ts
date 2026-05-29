import amazonaws from '@iconify-icons/logos/aws'
import cplusplus from '@iconify-icons/logos/c-plusplus'
import github from '@iconify-icons/logos/github-icon'
import hibernate from '@iconify-icons/logos/hibernate'
import intellijidea from '@iconify-icons/logos/intellij-idea'
import javascript from '@iconify-icons/logos/javascript'
import linkedin from '@iconify-icons/logos/linkedin-icon'
import microsoftsharepoint from '@iconify-icons/logos/microsoft'
import microsoft from '@iconify-icons/logos/microsoft-icon'
import powerbi from '@iconify-icons/logos/microsoft-power-bi'
import mysql from '@iconify-icons/logos/mysql-icon'
import nextdotjs from '@iconify-icons/logos/nextjs-icon'
import postgresql from '@iconify-icons/logos/postgresql'
import postman from '@iconify-icons/logos/postman-icon'
import react from '@iconify-icons/logos/react'
import salesforce from '@iconify-icons/logos/salesforce'
import springboot from '@iconify-icons/logos/spring-icon'
import tailwindcss from '@iconify-icons/logos/tailwindcss-icon'
import typescript from '@iconify-icons/logos/typescript-icon'
import udemy from '@iconify-icons/logos/udemy-icon'
import { type IconifyIcon } from '@iconify/types'

export interface LogoDefinition {
    provider: 'iconify-icons'
    light: LogoVariant
    dark?: LogoVariant
}

interface LogoVariant {
    icon: IconifyIcon
    className?: string
}

const normalizeLegacyIconKey = (icon: string) => {
    return icon
        .replace('icon-[simple-icons--', '')
        .replace('icon-[tabler--brand-', '')
        .replace('-filled]', '')
        .replace(']', '')
        .toLowerCase()
}

const createDarkUdemyIcon = (): IconifyIcon => ({
    ...udemy,
    body: udemy.body.replace('<path d=', '<path fill="#FFF" d='),
})

const udemyDark = createDarkUdemyIcon()

export const logoLibrary: Record<string, LogoDefinition> = {
    amazonaws: { provider: 'iconify-icons', light: { icon: amazonaws } },
    cplusplus: { provider: 'iconify-icons', light: { icon: cplusplus } },
    github: {
        provider: 'iconify-icons',
        light: { icon: github },
        dark: { icon: github, className: 'invert' },
    },
    hibernate: { provider: 'iconify-icons', light: { icon: hibernate } },
    intellijidea: { provider: 'iconify-icons', light: { icon: intellijidea } },
    javascript: { provider: 'iconify-icons', light: { icon: javascript } },
    linkedin: { provider: 'iconify-icons', light: { icon: linkedin } },
    microsoft: { provider: 'iconify-icons', light: { icon: microsoft } },
    microsoftsharepoint: { provider: 'iconify-icons', light: { icon: microsoftsharepoint } },
    mysql: { provider: 'iconify-icons', light: { icon: mysql } },
    nextdotjs: {
        provider: 'iconify-icons',
        light: { icon: nextdotjs },
        dark: { icon: nextdotjs, className: 'invert' },
    },
    postgresql: { provider: 'iconify-icons', light: { icon: postgresql } },
    postman: { provider: 'iconify-icons', light: { icon: postman } },
    powerbi: { provider: 'iconify-icons', light: { icon: powerbi } },
    react: { provider: 'iconify-icons', light: { icon: react } },
    salesforce: { provider: 'iconify-icons', light: { icon: salesforce } },
    springboot: { provider: 'iconify-icons', light: { icon: springboot } },
    tailwindcss: { provider: 'iconify-icons', light: { icon: tailwindcss } },
    typescript: { provider: 'iconify-icons', light: { icon: typescript } },
    udemy: {
        provider: 'iconify-icons',
        light: { icon: udemy },
        dark: { icon: udemyDark },
    },
}

export const getLogoDefinition = (icon: string) => {
    return logoLibrary[normalizeLegacyIconKey(icon)]
}
