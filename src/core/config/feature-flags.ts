
export enum FeatureFlag {
  SHOW_SESSION_INDICATOR = 'SHOW_SESSION_INDICATOR',
  // Add more feature flags here
}

const ENABLED_FEATURES: Set<FeatureFlag> = new Set([
  FeatureFlag.SHOW_SESSION_INDICATOR,
  // Add more enabled features here
])

export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return ENABLED_FEATURES.has(feature)
}
