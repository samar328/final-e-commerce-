import type { NextConfig } from "next";
// curl --location '"https://ecommerce.routemisr.com/Route-Academy-products/1680393143751-1.jpeg",'
const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        // pathname: '/*/**',
      },
    ],
  },

};

export default nextConfig;
