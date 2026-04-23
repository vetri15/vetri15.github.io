/** @type {import('next').NextConfig} */

const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET
const isGithubPages = deployTarget === 'github'

const nextConfig = {
    ...(isGithubPages
        ? {
              output: 'export',
              basePath: '',
              assetPrefix: '',
          }
        : {}),
    images: { unoptimized: true },
}

export default nextConfig
