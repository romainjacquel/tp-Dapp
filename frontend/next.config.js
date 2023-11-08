/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env: {
    WALLET_CONNECT_API_KEY: process.env.WALLET_CONNECT_API_KEY,
    INFURA_API_KEY: process.env.INFURA_API_KEY
  },
};

module.exports = nextConfig;
