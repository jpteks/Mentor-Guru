/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/f3s5czn47t/**",
      },
    ],
  },
  webpack: config => {
    config.resolve.alias.canvas = false; // Prevents errors related to the `canvas` package
    return config;
  },
};

export default nextConfig;
