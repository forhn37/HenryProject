// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oferbwhvoqhnavmzljrj.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },
  // 여기에 다른 설정들...
};

export default nextConfig;
