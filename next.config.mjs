import nextMDX from '@next/mdx';
import withSearch from './src/mdx/search.mjs';
import {remarkPlugins} from './src/mdx/remark.mjs';
import {rehypePlugins} from './src/mdx/rehype.mjs';
import {recmaPlugins} from './src/mdx/recma.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snappi-bank.atlassian.net',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://snappi-bank.atlassian.net/' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SNAPPI_DOCS_PUBLIC_API_URL: process.env.NEXT_PUBLIC_SNAPPI_DOCS_PUBLIC_API_URL,
    NEXT_PUBLIC_SNAPPI_SANDBOX_PUBLIC_API_URL: process.env.NEXT_PUBLIC_SNAPPI_SANDBOX_PUBLIC_API_URL,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },
};

export default withSearch(withMDX(nextConfig));