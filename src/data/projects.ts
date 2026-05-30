export interface Project {
    title: string
    description: string
    image: string
    techStack: string[]
    githubUrl: string
    liveDemoUrl?: string
    keyFeatures: string[]
    impact: string[]
    isFeatured: boolean
    isFullWidth?: boolean
}

export const projects = [
    {
        title: 'Youtube assistant',
        description:
            'Designed a local RAG workflow that turns YouTube transcripts into searchable context and answers questions with an Ollama-powered LLM.',
        image: '/images/projects/youtube-llm.png',
        techStack: ['AI', 'JavaScript', 'LangChain', 'Pinecone', 'Ollama', 'LLM', 'Vector Search'],
        githubUrl: 'https://github.com/vetri15/langchain_demo',
        keyFeatures: [
            'Fetches YouTube transcripts and chunks long-form content for retrieval.',
            'Indexes transcript embeddings in Pinecone for semantic search.',
            'Combines retrieved context with a locally running LLM for grounded answers.',
        ],
        impact: [
            'Turned passive video watching into a searchable Q&A workflow.',
            'Shows ownership across ingestion, vector indexing, retrieval, and local inference.',
        ],
        isFeatured: true,
        isFullWidth: true,
    },
    {
        title: 'Buy me Coffee',
        description:
            'Built a decentralized creator-support app that connects a Next.js interface to Solidity smart contracts for transparent crypto donations.',
        image: '/images/projects/buy-me-coffee.png',
        techStack: ['Blockchain', 'Next.js', 'Solidity', 'Hardhat', 'Ethers.js', 'Web3', 'Smart Contracts'],
        githubUrl: 'https://github.com/vetri15/buy-me-coffee',
        keyFeatures: [
            'Connects wallet-based users to creator donation flows.',
            'Uses Hardhat for smart-contract development and local deployment.',
            'Records support messages and donation activity on-chain.',
        ],
        impact: [
            'Demonstrates full-stack Web3 delivery from contract logic to UI.',
            'Creates a direct payment path without a centralized processor.',
        ],
        isFeatured: true,
        isFullWidth: true,
    },
] satisfies Project[]
