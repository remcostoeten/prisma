/**
 * Feature Flag Management System
 *
 * @description
 * Provides a centralized, type-safe mechanism for managing application features.
 */

export const featureFlags = {
	FORGOT_PASSWORD: false,
	SOCIAL_LOGIN: true,
	TWO_FACTOR_AUTH: false,
	EMAIL_VERIFICATION: true,
	DEV_TOOLS: process.env.NODE_ENV === 'development',
	PASSWORD_STRENGTH_CHECKER: true,
	SHOW_SESSION_INDICATOR: true,
	SHOW_NOTIFICATIONS: true,
	FONT_SWITCHER: true
} as const

export type FeatureFlag = keyof typeof featureFlags

/**
 * Check if a specific feature is currently enabled
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
	return featureFlags[feature]
}

/**
 * Get all currently enabled features
 */
export function getEnabledFeatures(): FeatureFlag[] {
	return Object.entries(featureFlags)
		.filter(([, isEnabled]) => isEnabled)
		.map(([feature]) => feature as FeatureFlag)
}
