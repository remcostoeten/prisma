import { useEffect, useRef } from 'react'
import { MATRIX_GRID_CONFIG } from '../config/matrix-config'
export function useMatrixRain(enabled: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!enabled || !MATRIX_GRID_CONFIG.MATRIX_RAIN.ENABLED) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const columns = canvas.width / MATRIX_GRID_CONFIG.MATRIX_RAIN.FONT_SIZE
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = MATRIX_GRID_CONFIG.MATRIX_RAIN.CHARACTERS

    function draw() {
      ctx.fillStyle = 'rgba(13, 12, 12, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = MATRIX_GRID_CONFIG.MATRIX_RAIN.COLOR
      ctx.font = `${MATRIX_GRID_CONFIG.MATRIX_RAIN.FONT_SIZE}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * MATRIX_GRID_CONFIG.MATRIX_RAIN.FONT_SIZE, drops[i] * MATRIX_GRID_CONFIG.MATRIX_RAIN.FONT_SIZE)

        if (drops[i] * MATRIX_GRID_CONFIG.MATRIX_RAIN.FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, MATRIX_GRID_CONFIG.MATRIX_RAIN.SPEED)

    return () => clearInterval(interval)
  }, [enabled])

  return canvasRef
}

