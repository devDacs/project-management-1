/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_IMAGE_BASE_URL).hostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
