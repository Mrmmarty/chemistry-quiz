/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Configure the base path only in production for GitHub Pages
    basePath: process.env.NODE_ENV === 'production' ? '/chemistry-quiz' : '',
    // This setting is required for GitHub Pages
    images: {
        unoptimized: true,
    },
    // Disable TypeScript strict mode for build
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Ignoring TypeScript errors to allow builds to complete
        // This should be removed in a production environment
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig; 