'use client'

/**
 * @author remcostoeten
 * @description A modular, accessible, and easy-to-use tooltip component.
 */

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
type Theme = 'light' | 'dark';
type Placement = 'top' | 'right' | 'bottom' | 'left';

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
}

const themes: Record<Theme, string> = {
    light: 'bg-white border border-gray-200 text-gray-800',
    dark: 'bg-gray-800 border border-gray-700 text-white',
};

const placements: Record<Placement, { initial: { opacity: number, x: number, y: number }, animate: { opacity: number, x: number, y: number }, exit: { opacity: number, x: number, y: number } }> = {
    top: { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
    right: { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 } },
    bottom: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
    left: { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } },
};

/**
 * A modular, accessible, and easy-to-use tooltip component.
 * 
 * @example
 * <Tooltip content="This is a tooltip">
 *   Hover me
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
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<NodeJS.Timeout>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout>(null);

    const showTooltip = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        showTimeoutRef.current = setTimeout(() => setIsVisible(true), showDelay);
    };

    const hideTooltip = () => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setIsVisible(false), hideDelay);
    };

    useEffect(() => {
        const updatePosition = () => {
            if (triggerRef.current && tooltipRef.current && isVisible) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const tooltipRect = tooltipRef.current.getBoundingClientRect();
                let top = 0;
                let left = 0;

                switch (placement) {
                    case 'top':
                        top = triggerRect.top - tooltipRect.height - 10;
                        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                        break;
                    case 'right':
                        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                        left = triggerRect.right + 10;
                        break;
                    case 'bottom':
                        top = triggerRect.bottom + 10;
                        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                        break;
                    case 'left':
                        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                        left = triggerRect.left - tooltipRect.width - 10;
                        break;
                }

                setPosition({ top, left });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
            if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [isVisible, placement]);

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
            >
                {children}
            </span>
            <AnimatePresence>
                {isVisible && (
                    <framerMotion.div
                        ref={tooltipRef}
                        className={`fixed z-50 px-4 py-2 rounded-md shadow-md ${themes[theme]} ${className}`}
                        style={{ ...position }}
                        initial={animate ? placements[placement].initial : undefined}
                        animate={animate ? placements[placement].animate : undefined}
                        exit={animate ? placements[placement].exit : undefined}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        {content}
                        {caret && (
                            <div
                                className={`absolute w-3 h-3 transform rotate-45 ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                                    }`}
                                style={{
                                    top: placement === 'bottom' ? '-6px' : 'auto',
                                    bottom: placement === 'top' ? '-6px' : 'auto',
                                    left: placement === 'right' ? '-6px' : 'auto',
                                    right: placement === 'left' ? '-6px' : 'auto',
                                    [placement]: '50%',
                                    transform: `translate${placement === 'top' || placement === 'bottom' ? 'X' : 'Y'}(-50%) rotate(45deg)`,
                                }}
                            />
                        )}
                    </framerMotion.div>
                )}
            </AnimatePresence>
        </>
    );
}
