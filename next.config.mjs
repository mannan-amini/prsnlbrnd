/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
