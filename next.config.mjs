/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const nextConfig = {
    output: 'export',
    basePath: (isProd && !isVercel) ? "/Personal-Website" : "",
    assetPrefix: (isProd && !isVercel) ? "/Personal-Website/" : "",
    images: { unoptimized: true },
}

export default nextConfig
