/* 
title: 'Project Title' - The title of the project.
description: 'Project description.' - The description of the project.
image: '/images/projects/project-image.webp' - The path to the project image.
status: {
    text: 'Status' - The status of the project. (e.g. View Source, Coming Soon, Private Repository)
    link: 'Link' - The link to the project status. (e.g. GitHub Repository, Website)
    icon: 'icon-class' - The icon for the status. https://icon-sets.iconify.design/tabler/?query=mail&prefixes=tabler
}
note: 'Note' - A note for the project. (e.g. In development, Coming Soon)
isFeatured: true - Show the project in the featured section.
isFullWidth: true - Make the project image full width.
*/

export const projects = [
    {
        title: 'Youtube assistant',
        description: 'Building a smart local YouTube assistant using LangChain, Pinecone, and Ollama-powered LLMs. It helps process, index, and query video content efficiently, enabling fast, AI-driven insights from YouTube video.',
        image: '/images/projects/youtube-llm.png',
        status: {
            text: 'View Source',
            link: 'https://github.com/vetri15/langchain_demo',
            icon: 'icon-[tabler--arrow-right]',
        },
        note: 'AI',
        isFeatured: true,
        isFullWidth: true,
    },
    {
        title: 'Buy me Coffee',
        description:
            'A decentralized Buy Me a Coffee app built with Next.js, Hardhat, and Solidity, enabling seamless crypto donations. It lets users support creators directly on-chain with secure and transparent transactions.',
        image: '/images/projects/buy-me-coffee.webp',
        status: {
            text: 'View Source',
            link: 'https://github.com/vetri15/buy-me-coffee',
            icon: 'icon-[tabler--arrow-right]',
        },
        note: 'Block chain',
        isFeatured: true,
        isFullWidth: true
    }
]
