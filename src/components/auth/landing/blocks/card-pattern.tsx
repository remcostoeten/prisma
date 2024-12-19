"use client"

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate } from 'framer-motion'
import { CardPatternProps } from '@/core/types/card'
import { DEFAULT_SPOTLIGHT_SIZE, DEFAULT_SPOTLIGHT_COLOR, DEFAULT_SPOTLIGHT_STRENGTH, DEFAULT_TEXT_COLOR, DEFAULT_TEXT_SIZE } from '../../../../../constants/defaults'

export const CardPattern = ({
    mouseX,
    mouseY,
    randomString,
    size = DEFAULT_SPOTLIGHT_SIZE,
    color = DEFAULT_SPOTLIGHT_COLOR,
    strength = DEFAULT_SPOTLIGHT_STRENGTH,
    textColor = DEFAULT_TEXT_COLOR,
    textSize = DEFAULT_TEXT_SIZE
}: CardPatternProps) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const isHovering = useRef(false)

    useEffect(() => {
        const currentInterval = intervalRef.current
        return () => {
            if (currentInterval) {
                clearInterval(currentInterval)
            }
        }
    }, [mouseX, mouseY])

    const maskImage = useMotionTemplate`radial-gradient(${size}px at ${mouseX}px ${mouseY}px, white, transparent)`
    const style = { maskImage, WebkitMaskImage: maskImage }

    const gradientStyle = typeof color === 'string'
        ? { background: color }
        : { backgroundImage: `linear-gradient(to right, ${color.from}, ${color.to})` }

    return (
        <div
            className="pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
            onMouseEnter={() => { isHovering.current = true }}
            onMouseLeave={() => { isHovering.current = false }}
        >
            <motion.div
                className="absolute inset-0 backdrop-blur-xl transition duration-500"
                style={{ ...style, ...gradientStyle, opacity: strength }}
            />
            <motion.div
                className="absolute inset-0 mix-blend-overlay"
                style={style}
            >
                <p
                    className="absolute inset-x-0 h-full break-words whitespace-pre-wrap font-mono font-bold transition duration-500"
                    style={{ color: textColor, fontSize: textSize }}
                >
                    {randomString}
                </p>
            </motion.div>
        </div>
    )
}

