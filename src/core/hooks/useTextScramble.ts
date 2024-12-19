'use client'

import { useState, useEffect, useCallback } from 'react'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+'

export type UseTextScrambleProps = {
    text: string
    isHovering: boolean
    scrambleDuration?: number
    updateInterval?: number
}

export const useTextScramble = ({
    text,
    isHovering,
    updateInterval = 50
}: UseTextScrambleProps) => {
    const [scrambledText, setScrambledText] = useState(text)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const scrambleText = useCallback(() => {
        const scramble = () => {
            if (!isHovering) {
                setScrambledText(text)
                return
            }

            const scrambled = text
                .split('')
                .map(char => {
                    if (char === ' ') return ' '
                    return Math.random() > 0.5 ? char : characters[Math.floor(Math.random() * characters.length)]
                })
                .join('')

            setScrambledText(scrambled)

            if (isHovering) {
                setTimeoutId(setTimeout(scramble, updateInterval))
            }
        }

        scramble()
    }, [text, isHovering, updateInterval])

    useEffect(() => {
        if (isHovering) {
            scrambleText()
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            setScrambledText(text)
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [isHovering, scrambleText, text, timeoutId])

    return scrambledText
} 
