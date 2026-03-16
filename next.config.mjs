/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/founder-glenn",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/founder-glenn/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/NexusBodyOS/terms",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/NexusBodyOS/privacy",
        permanent: true,
      },
      {
        source: "/support",
        destination: "/NexusBodyOS/support",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/NexusBodyOS/faq",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/NexusBodyOS/contact",
        permanent: true,
      },
      {
        source: "/updates",
        destination: "/NexusBodyOS/updates",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/NexusBodyOS/about",
        permanent: true,
      },
      {
        source: "/features",
        destination: "/NexusBodyOS/features",
        permanent: true,
      },
      {
        source: "/delete-data",
        destination: "/NexusBodyOS/delete-data",
        permanent: true,
      },
      {
        source: "/subscription",
        destination: "/NexusBodyOS/subscription",
        permanent: true,
      },
      {
        source: "/nexushealthcar/:path*",
        destination: "/NexusBodyOS/:path*",
        permanent: true,
      },
      {
        source: "/nexushealthcare/:path*",
        destination: "/NexusBodyOS/:path*",
        permanent: true,
      },
      {
        source: "/nexushealthkit/:path*",
        destination: "/NexusBodyOS/:path*",
        permanent: true,
      },
      {
        source: "/NexusHealthKit/:path*",
        destination: "/NexusBodyOS/:path*",
        permanent: true,
      },
      {
        source: "/NexusHealth/:path*",
        destination: "/NexusBodyOS/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
