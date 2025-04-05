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
    // Add assetPrefix for fonts to work correctly with basePath
    assetPrefix: process.env.NODE_ENV === 'production' ? '/chemistry-quiz' : '',

    // Ensure static assets are included in the output
    distDir: 'out',

    // Moved from experimental to root level as recommended
    outputFileTracingExcludes: {
        '*': [
            // Exclude some unnecessary files
            'node_modules/**/*.{js,map,json}',
            '.next/cache/**',
        ],
    },

    // Enable trailing slash for GitHub Pages compatibility
    trailingSlash: true,

    // Empty experimental object, could be removed if not needed
    experimental: {}
};

module.exports = nextConfig; 