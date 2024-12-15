import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'web.archive.org',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '*github*',
				port: '',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: '*google*',
				port: '',
				pathname: '**'
			}
		]
	}
}

export default nextConfig