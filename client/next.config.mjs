/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
