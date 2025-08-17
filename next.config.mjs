/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reservaa-images.s3.us-east-1.amazonaws.com",
      },
    ],
    unoptimized: true, // Disable image optimization for S3 images to avoid 403 errors
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
