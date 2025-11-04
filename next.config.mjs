/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Use only for MVP/prototype deployment.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds with TypeScript errors.
    // Remove this for production-ready code.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
