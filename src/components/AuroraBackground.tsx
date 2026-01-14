import { useEffect, useRef } from 'react'

const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Aurora animation
    let animationFrame: number
    let time = 0

    const colors = [
      { r: 22, g: 248, b: 182 }, // teal
      { r: 125, g: 249, b: 255 }, // mint
      { r: 255, g: 181, b: 232 }, // pink
      { r: 76, g: 201, b: 240 }, // blue
    ]

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.3)`)
      gradient.addColorStop(0.25, `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.2)`)
      gradient.addColorStop(0.5, `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, 0.3)`)
      gradient.addColorStop(0.75, `rgba(${colors[3].r}, ${colors[3].g}, ${colors[3].b}, 0.2)`)
      gradient.addColorStop(1, `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.3)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animated waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin((x / canvas.width) * Math.PI * 4 + time * 0.001 + i) * 100 +
            Math.cos((x / canvas.width) * Math.PI * 2 + time * 0.0005) * 50

          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        const colorIndex = i % colors.length
        waveGradient.addColorStop(
          0,
          `rgba(${colors[colorIndex].r}, ${colors[colorIndex].g}, ${colors[colorIndex].b}, 0.4)`
        )
        waveGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      time += 16
      animationFrame = requestAnimationFrame(drawAurora)
    }

    drawAurora()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

export default AuroraBackground

