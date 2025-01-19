/**
 * Feature Flag Management System
 *
 * @description
 * Provides a centralized, type-safe mechanism for managing application features.
 */

import { MATRIX_GRID_CONFIG } from "@/features/landing/components/matrix-grid/config/matrix-config";

const FORGOT_PASSWORD_ENABLED = false;
const SOCIAL_LOGIN_ENABLED = true;
const TWO_FACTOR_AUTH_ENABLED = false;
const EMAIL_VERIFICATION_ENABLED = true;
const PASSWORD_STRENGTH_CHECKER_ENABLED = true;
const SHOW_SESSION_INDICATOR_ENABLED = true;
const SHOW_NOTIFICATIONS_ENABLED = true;
const FONT_SWITCHER_ENABLED = true;

export const featureFlags = {
  FORGOT_PASSWORD: FORGOT_PASSWORD_ENABLED,
  SOCIAL_LOGIN: SOCIAL_LOGIN_ENABLED,
  TWO_FACTOR_AUTH: TWO_FACTOR_AUTH_ENABLED,
  EMAIL_VERIFICATION: EMAIL_VERIFICATION_ENABLED,
  DEV_TOOLS: process.env.NODE_ENV === 'development',
  PASSWORD_STRENGTH_CHECKER: PASSWORD_STRENGTH_CHECKER_ENABLED,
  SHOW_SESSION_INDICATOR: SHOW_SESSION_INDICATOR_ENABLED,
  SHOW_NOTIFICATIONS: SHOW_NOTIFICATIONS_ENABLED,
  FONT_SWITCHER: FONT_SWITCHER_ENABLED,
  ANIMATIONS: {
    grid: true
  },
  MATRIX_GRID: MATRIX_GRID_CONFIG,
} as const;

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

/**
 * Check if a specific Matrix Grid animation is enabled
 */
export function isMatrixGridAnimationEnabled(animationKey: keyof typeof featureFlags.ANIMATIONS): boolean {
  return featureFlags.ANIMATIONS[animationKey]
}

/**
 * Check if a specific Matrix Grid accessibility feature is enabled
 */
export function isMatrixGridAccessibilityFeatureEnabled(featureKey: keyof typeof MATRIX_GRID_CONFIG.ACCESSIBILITY): boolean {
  return MATRIX_GRID_CONFIG.ACCESSIBILITY[featureKey]
}

