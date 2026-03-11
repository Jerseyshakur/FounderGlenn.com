/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/nexushealthcare/:path*",
        destination: "/NexusHealthKit/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
