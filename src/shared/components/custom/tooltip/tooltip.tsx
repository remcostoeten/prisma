/**
 * @file Tooltip.tsx
 * @description A modular, accessible, and customizable tooltip component with animation support.
 * Features include customizable themes, placements, animations, delays, optional dashed underline,
 * and an animated dashed border bottom for the tooltip trigger.
 */

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

/** Available theme options for the tooltip */
type Theme = 'light' | 'dark';

/** Available placement options for the tooltip relative to its trigger */
type Placement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props for the Tooltip component
 * @interface TooltipProps
 */
interface TooltipProps {
    /** The element that triggers the tooltip */
    children: ReactNode;
    /** The content to be displayed in the tooltip */
    content: ReactNode;
    /** Additional class name for the tooltip container */
    className?: string;
    /** Whether to show a caret pointing to the trigger element */
    caret?: boolean;
    /** The theme of the tooltip */
    theme?: Theme;
    /** Whether to animate the tooltip */
    animate?: boolean;
    /** The delay before showing the tooltip (in milliseconds) */
    showDelay?: number;
    /** The delay before hiding the tooltip (in milliseconds) */
    hideDelay?: number;
    /** The placement of the tooltip relative to the trigger */
    placement?: Placement;
    /** Whether to show an animated dashed underline on the trigger element */
    dashedUnderline?: boolean;
    /** Whether to show a dashed border on the trigger element */
    dashedBorder?: boolean;
    /** Whether to show an animated dashed border bottom on the trigger element */
    dashedBorderBottom?: boolean;
    /** Background color for the tooltip */
    bgColor?: string;
}

/**
 * Theme configurations for the tooltip
 * @constant themes
 */
const themes: Record<Theme, string> = {
    light: 'bg-white border border-gray-200 text-gray-800',
    dark: 'bg-gray-800 border border-gray-700 text-white',
};

const placements: Record<Placement, { initial: any; animate: any; exit: any }> = {
    top: {
        initial: { y: -10, opacity: 0, scale: 0.8 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: -10, opacity: 0, scale: 0.8 },
    },
    right: {
        initial: { x: 10, opacity: 0, scale: 0.8 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: 10, opacity: 0, scale: 0.8 },
    },
    bottom: {
        initial: { y: 10, opacity: 0, scale: 0.8 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: 10, opacity: 0, scale: 0.8 },
    },
    left: {
        initial: { x: -10, opacity: 0, scale: 0.8 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: -10, opacity: 0, scale: 0.8 },
    },
};

/**
 * A modular, accessible, and customizable tooltip component.
 * 
 * @component
 * @example
 * // Basic usage
 * <Tooltip content="Helpful tip">
 *   Hover me
 * </Tooltip>
 * 
 * @example
 * // Advanced usage with custom styling and animation
 * <Tooltip
 *   content="Custom tooltip"
 *   theme="dark"
 *   placement="right"
 *   dashedUnderline
 *   dashedBorderBottom
 *   showDelay={200}
 *   hideDelay={100}
 *   bgColor="#f0f0f0"
 * >
 *   <button>Hover for info</button>
 * </Tooltip>
 */
export function Tooltip({
    children,
    content,
    className = '',
    caret = true,
    theme = 'light',
    animate = true,
    showDelay = 0,
    hideDelay = 0,
    placement = 'top',
    dashedUnderline = false,
    dashedBorder = false,
    dashedBorderBottom = false,
    bgColor,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        setTimeout(() => {
            setIsVisible(true);
        }, showDelay);
    };

    const hideTooltip = () => {
        setTimeout(() => {
            setIsVisible(false);
        }, hideDelay);
    };

    const position = {
        top: triggerRef.current?.offsetTop + triggerRef.current?.offsetHeight + 10,
        left: triggerRef.current?.offsetLeft,
    };


    return (
        <>
            <framerMotion.span
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                className={`inline-block relative ${dashedUnderline ? 'border-b border-dashed border-current' : ''}`}
                style={{ 
                    border: dashedBorder ? '1px dashed' : 'none',
                    borderBottom: dashedBorderBottom ? 'none' : undefined
                }}
                whileHover={dashedUnderline || dashedBorderBottom ? { scale: 1.02 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                {children}
                {dashedBorderBottom && (
                    <framerMotion.span
                        className="absolute bottom-0 left-0 w-full border-b border-dashed border-current opacity-60"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </framerMotion.span>
            <AnimatePresence>
                {isVisible && (
                    <framerMotion.div
                        ref={tooltipRef}
                        className={`fixed z-50 px-4 py-2 rounded-md shadow-md ${bgColor ? '' : themes[theme]} ${className}`}
                        style={{ ...position, backgroundColor: bgColor }}
                        initial={animate ? placements[placement].initial : undefined}
                        animate={animate ? placements[placement].animate : undefined}
                        exit={animate ? placements[placement].exit : undefined}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        {content}
                        {caret && (
                            <div
                                className={`absolute w-3 h-3 transform rotate-45 ${
                                    bgColor ? '' : (theme === 'light' 
                                        ? 'bg-white border border-gray-200' 
                                        : 'bg-gray-800 border border-gray-700')
                                }`}
                                style={{
                                    top: placement === 'bottom' ? '-6px' : 'auto',
                                    bottom: placement === 'top' ? '-6px' : 'auto',
                                    left: placement === 'right' ? '-6px' : 'auto',
                                    right: placement === 'left' ? '-6px' : 'auto',
                                    [placement]: '50%',
                                    transform: `translate${placement === 'top' || placement === 'bottom' ? 'X' : 'Y'}(-50%) rotate(45deg)`,
                                    backgroundColor: bgColor
                                }}
                            />
                        )}
                    </framerMotion.div>
                )}
            </AnimatePresence>
        </>
    );
}

