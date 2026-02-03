import { useEffect, useRef } from 'react'

export default function NeuralBackground({
  className = '',
  color = '#6366f1',
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
  isDark = true,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = container.clientWidth
    let height = container.clientHeight
    let particles = []
    let animationFrameId
    let mouse = { x: -1000, y: -1000 }

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      update() {
        // Flow Field Math
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI

        // Add force from flow field
        this.vx += Math.cos(angle) * 0.2 * speed
        this.vy += Math.sin(angle) * 0.2 * speed

        // Mouse Repulsion
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const interactionRadius = 150

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius
          this.vx -= dx * force * 0.05
          this.vy -= dy * force * 0.05
        }

        // Apply Velocity & Friction
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.95
        this.vy *= 0.95

        // Aging
        this.age++
        if (this.age > this.life) {
          this.reset()
        }

        // Wrap around screen
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      draw(context) {
        context.fillStyle = color
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2
        context.globalAlpha = alpha
        context.fillRect(this.x, this.y, 1.5, 1.5)
      }
    }

    // Initialization
    const init = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Fill with solid background color on init
      const bgColor = isDark ? '#0f0f23' : '#f8fafc'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Animation Loop
    const animate = () => {
      // Trail effect - use appropriate background color
      const trailColor = isDark
        ? `rgba(15, 15, 35, ${trailOpacity})`
        : `rgba(248, 250, 252, ${trailOpacity})`
      ctx.fillStyle = trailColor
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Event Listeners
    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    // Start
    init()
    animate()

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, trailOpacity, particleCount, speed, isDark])

  const bgClass = isDark ? 'bg-[#0f0f23]' : 'bg-[#f8fafc]'

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${bgClass} ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
