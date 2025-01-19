// const MATRIX_GREEN = '#0f0'

export const MATRIX_GRID_CONFIG = {
  MATRIX_RAIN: {
    ENABLED: true,
    SPEED: 33, // milliseconds between frames
    COLOR: '#0f0', // green color
    FONT_SIZE: 15,
    CHARACTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%',
  },
  SPOTLIGHT: {
    ENABLED: true,
    COLOR: 'rgba(15, 255, 15, 0.15)', // Slightly green tint with increased opacity
    STRENGTH: 1, // Full strength
    RADIUS: 35, // 35% of the card size
  },
  ANIMATIONS: {
    CARD_HOVER: true,
    STAGGERED_ENTRANCE: true,
  },
  ACCESSIBILITY: {
    HIGH_CONTRAST_MODE: false,
    REDUCED_MOTION: false,
  },
};

export type MatrixGridConfig = typeof MATRIX_GRID_CONFIG;

