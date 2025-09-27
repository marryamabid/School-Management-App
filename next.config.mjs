/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // optional but good to specify
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
