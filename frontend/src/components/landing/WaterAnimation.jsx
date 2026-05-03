import { useEffect, useRef } from 'react'
import './WaterAnimation.css'

export default function WaterAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let w, h

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Droplet state
    const droplets = []
    const ripples = []
    const tapX = w / 2
    const tapY = h * 0.15
    const waterLevel = h * 0.72
    let dropTimer = 0
    const dropInterval = 90 // frames between drops

    class Droplet {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vy = 0
        this.gravity = 0.18
        this.radius = 6
        this.opacity = 0.9
        this.forming = true
        this.formProgress = 0
        this.active = true
      }
      update() {
        if (this.forming) {
          this.formProgress += 0.025
          if (this.formProgress >= 1) {
            this.forming = false
          }
          return
        }
        this.vy += this.gravity
        this.y += this.vy
        // Subtle stretch effect while falling
        if (this.y >= waterLevel) {
          this.active = false
          ripples.push(new Ripple(this.x, waterLevel))
        }
      }
      draw(ctx) {
        const scale = this.forming ? this.formProgress : 1
        const r = this.radius * scale
        const stretch = this.forming ? 1 : Math.min(1 + this.vy * 0.04, 1.6)
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(1 / stretch, stretch)
        ctx.beginPath()
        // Teardrop shape
        ctx.moveTo(0, -r * 1.4)
        ctx.bezierCurveTo(r * 0.8, -r * 0.6, r, r * 0.4, 0, r)
        ctx.bezierCurveTo(-r, r * 0.4, -r * 0.8, -r * 0.6, 0, -r * 1.4)
        ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * scale})`
        ctx.fill()
        // Highlight
        ctx.beginPath()
        ctx.arc(-r * 0.2, -r * 0.2, r * 0.25, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.6 * scale})`
        ctx.fill()
        ctx.restore()
      }
    }

    class Ripple {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 4
        this.maxRadius = 60
        this.opacity = 0.5
        this.active = true
      }
      update() {
        this.radius += 0.8
        this.opacity -= 0.008
        if (this.opacity <= 0) this.active = false
      }
      draw(ctx) {
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.3, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(37, 99, 235, ${this.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        // Inner ripple
        if (this.radius > 15) {
          ctx.beginPath()
          ctx.ellipse(this.x, this.y, this.radius * 0.5, this.radius * 0.15, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(37, 99, 235, ${this.opacity * 0.5})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    function drawTap(ctx) {
      const tx = tapX
      const ty = tapY
      // Pipe
      ctx.fillStyle = '#94A3B8'
      ctx.fillRect(tx - 18, ty - 50, 36, 40)
      // Spout
      ctx.beginPath()
      ctx.roundRect(tx - 8, ty - 12, 16, 20, 4)
      ctx.fillStyle = '#64748B'
      ctx.fill()
      // Nozzle tip
      ctx.beginPath()
      ctx.roundRect(tx - 5, ty + 6, 10, 6, 2)
      ctx.fillStyle = '#475569'
      ctx.fill()
      // Pipe horizontal
      ctx.fillStyle = '#94A3B8'
      ctx.fillRect(tx - 60, ty - 50, 120, 12)
      // Valve handle
      ctx.beginPath()
      ctx.arc(tx + 24, ty - 30, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#2563EB'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(tx + 24, ty - 30, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#1D4ED8'
      ctx.fill()
    }

    function drawWaterSurface(ctx, time) {
      ctx.beginPath()
      ctx.moveTo(0, waterLevel)
      for (let x = 0; x <= w; x += 2) {
        const y = waterLevel + Math.sin(x * 0.02 + time * 0.02) * 2
          + Math.sin(x * 0.01 + time * 0.015) * 1.5
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, waterLevel, 0, h)
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.08)')
      grad.addColorStop(0.5, 'rgba(37, 99, 235, 0.04)')
      grad.addColorStop(1, 'rgba(37, 99, 235, 0.01)')
      ctx.fillStyle = grad
      ctx.fill()
    }

    let frame = 0
    function animate() {
      ctx.clearRect(0, 0, w, h)
      frame++

      // Draw water surface
      drawWaterSurface(ctx, frame)

      // Draw tap
      drawTap(ctx)

      // Spawn droplet
      dropTimer++
      if (dropTimer >= dropInterval) {
        dropTimer = 0
        droplets.push(new Droplet(tapX, tapY + 12))
      }

      // Update & draw droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        droplets[i].update()
        if (!droplets[i].active) { droplets.splice(i, 1); continue }
        droplets[i].draw(ctx)
      }

      // Update & draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update()
        if (!ripples[i].active) { ripples.splice(i, 1); continue }
        ripples[i].draw(ctx)
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="water-animation">
      <canvas ref={canvasRef} />
    </div>
  )
}
