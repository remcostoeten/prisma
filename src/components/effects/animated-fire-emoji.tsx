import React, { useMemo } from 'react';

/**
 * Props for the FireAnimation component
 * Defines configuration options for fire animation
 */
type FireAnimationProps = {
    /** Speed of animation (in seconds) */
    speed?: number;
    /** Number of flame elements */
    flameCount?: number;
    /** Whether animation should repeat infinitely */
    infinite?: boolean;
    /** Additional CSS classes for customization */
    className?: string;
    /** Size of the fire (in pixels) */
    size?: number;
    /** Accessibility label for screen readers */
    ariaLabel?: string;
};

/**
 * FireAnimation Component
 * Renders an animated fire effect with  configurable properties
 * Follows SOLID principles:
 * - Single Responsibility: Handles fire animation rendering
 * - Open/Closed: Configurable via props
 * - Liskov Substitution: Props have sensible defaults
 * - Interface Segregation: Minimal, focused prop interface
 * - Dependency Inversion: Depends on abstractions (props)
 */
const FireAnimation: React.FC<FireAnimationProps> = ({
    speed = 2.5,
    flameCount = 4,
    infinite = true,
    className = '',
    size = 100,
    ariaLabel = 'Animated fire effect'
}) => {
    /**
     * Generates dynamic animation styles based on component props
     * Memoized for performance optimization
     */
    const animationStyle = useMemo(() => ({
        '--flame-size': size,
        animationDuration: `${speed}s`
    }), [size, speed]);

    /**
     * Generates flame elements with staggered delays
     * @returns Array of flame elements
     */
    const renderFlames = () => {
        return Array.from({ length: flameCount }, (_, index) => (
            <span
                key={index}
                className={`absolute transform-origin-[70%_70%] z-10 inline-block 
          ${index === 0 ? 'flame base' : 'flame animate'}
          opacity-0 ease-in`}
                style={{
                    top: `calc(var(--flame-size) * -1px)`,
                    animationDelay: index > 0 ? `${index * 0.5}s` : '0s',
                    animationIterationCount: infinite ? 'infinite' : 1,
                    animationName: 'flame-animation',
                    animationDuration: `${speed}s`
                }}
            >
                🔥
            </span>
        ));
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            style={animationStyle}
            aria-label={ariaLabel}
            role="img"
        >
            {renderFlames()}
        </div>
    );
};


export default FireAnimation;
