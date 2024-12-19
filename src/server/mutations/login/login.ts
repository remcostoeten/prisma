"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import { generateRandomString } from 'helpers'
import { DEFAULT_CHARACTERS } from '../../../../constants/defaults'
import { DEFAULT_UPDATE_SPEED } from '../../../../constants/defaults'

export const useSpotlight = (characters = DEFAULT_CHARACTERS, updateSpeed = DEFAULT_UPDATE_SPEED) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [randomString, setRandomString] = useState("")
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const isHovering = useRef(false)

    useEffect(() => {
        setRandomString(generateRandomString(1500, characters))
    }, [characters])

    const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)

        // Clear existing interval if any
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        // Start new interval for continuous updates
        intervalRef.current = setInterval(() => {
            if (isHovering.current) {
                setRandomString(generateRandomString(1500, characters))
            }
        }, updateSpeed)

        isHovering.current = true
    }, [characters, mouseX, mouseY, updateSpeed])

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return {
        mouseX,
        mouseY,
        randomString,
        handleMouseMove
    }
}

