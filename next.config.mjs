/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/kunststof-kozijnen', destination: '/pvc-ramen', permanent: true },
      { source: '/kunststof-kozijnen/ideal-7000-nl', destination: '/pvc-ramen/ideal-7000-nl', permanent: true },
      { source: '/aluminium-kozijnen', destination: '/pvc-ramen', permanent: true },
      { source: '/houten-kozijnen', destination: '/pvc-ramen', permanent: true },
    ];
  },
};
export default nextConfig;
