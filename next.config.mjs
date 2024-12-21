/** @type {import('next').NextConfig} */
 
const nextConfig = {
    reactStrictMode: false, 
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org', 
          },
          {
            protocol: 'https',
            hostname: 'static-00.iconduck.com', 
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com', 
          },
          {
            protocol: 'https',
            hostname: 't3.ftcdn.net', 
          },
          {
            protocol: 'https',
            hostname: 'platform-lookaside.fbsbx.com', 
          },
        ],
      },
};

export default nextConfig;
