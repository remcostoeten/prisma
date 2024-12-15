import { fonts, fontVariables } from './fonts/font-config'
import { metadata } from '@/app/metadata'
import { siteConfig } from './site'

export const config = {
	fonts: {
		...fonts,
		variables: fontVariables
	},
	metadata,
	siteConfig
} as const

/**
 * Type-safe configuration accessor
 *
 * @example
 * const fontSettings = getConfig('fonts')
 * const featureFlags = getConfig('features')
 */
export function getConfig<K extends keyof typeof config>(key: K) {
	return config[key]
}

export type AppConfig = typeof config
