import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'

const VIEW_W = 1200
const VIEW_H = 800
const NODE_COUNT = 42
const CONNECT_DIST = 190
const MOUSE_RADIUS = 220
const MOUSE_STRENGTH = 28

interface Node {
  id: number
  baseX: number
  baseY: number
  x: number
  y: number
  radius: number
  phase: number
  speed: number
  ampX: number
  ampY: number
  isHub: boolean
}

interface Edge {
  a: number
  b: number
}

interface Pulse {
  edgeIndex: number
  t: number
  speed: number
}

interface ThemeColors {
  line: string
  node: string
  primary: string
  glow: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
    const baseX = seededRandom(i * 3) * VIEW_W
    const baseY = seededRandom(i * 7 + 1) * VIEW_H
    return {
      id: i,
      baseX,
      baseY,
      x: baseX,
      y: baseY,
      radius: seededRandom(i * 5) > 0.82 ? 3.5 : 2.2,
      phase: seededRandom(i * 17) * Math.PI * 2,
      speed: 0.35 + seededRandom(i * 19) * 0.55,
      ampX: 12 + seededRandom(i * 23) * 22,
      ampY: 12 + seededRandom(i * 29) * 22,
      isHub: seededRandom(i * 31) > 0.88,
    }
  })

  const edges: Edge[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].baseX - nodes[j].baseX
      const dy = nodes[i].baseY - nodes[j].baseY
      if (Math.hypot(dx, dy) < CONNECT_DIST) {
        edges.push({ a: i, b: j })
      }
    }
  }

  return { nodes, edges }
}

function readThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement)
  return {
    line: style.getPropertyValue('--line').trim() || 'rgba(0,0,0,0.08)',
    node: style.getPropertyValue('--node').trim() || '#94a3b8',
    primary: style.getPropertyValue('--primary').trim() || '#3b82f6',
    glow: style.getPropertyValue('--accent-glow').trim() || 'rgba(59,130,246,0.15)',
  }
}

function withAlpha(ctx: CanvasRenderingContext2D, alpha: number, draw: () => void) {
  const prev = ctx.globalAlpha
  ctx.globalAlpha = alpha
  draw()
  ctx.globalAlpha = prev
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const { isDark } = useTheme()
  const graph = useMemo(() => buildGraph(), [])

  const stateRef = useRef({
    mouse: { x: VIEW_W / 2, y: VIEW_H / 2, active: false },
    time: 0,
    pulses: [] as Pulse[],
    colors: readThemeColors(),
  })

  const spawnPulse = useCallback((edges: Edge[]) => {
    if (edges.length === 0) return
    const state = stateRef.current
    state.pulses.push({
      edgeIndex: Math.floor(Math.random() * edges.length),
      t: 0,
      speed: 0.004 + Math.random() * 0.006,
    })
    if (state.pulses.length > 6) state.pulses.shift()
  }, [])

  useEffect(() => {
    stateRef.current.colors = readThemeColors()
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { nodes, edges } = graph
    const state = stateRef.current
    let raf = 0
    let pulseTimer: ReturnType<typeof setInterval> | undefined

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = VIEW_W / rect.width
      const scaleY = VIEW_H / rect.height
      state.mouse.x = (e.clientX - rect.left) * scaleX
      state.mouse.y = (e.clientY - rect.top) * scaleY
      state.mouse.active = true
    }

    const onLeave = () => {
      state.mouse.active = false
    }

    const updateNodes = (time: number) => {
      const t = time * 0.001
      for (const node of nodes) {
        let x =
          node.baseX +
          Math.sin(t * node.speed + node.phase) * node.ampX +
          Math.cos(t * node.speed * 0.7 + node.phase) * (node.ampX * 0.35)
        let y =
          node.baseY +
          Math.cos(t * node.speed * 0.9 + node.phase) * node.ampY +
          Math.sin(t * node.speed * 0.6 + node.phase) * (node.ampY * 0.35)

        if (state.mouse.active && !reducedMotion) {
          const dx = state.mouse.x - x
          const dy = state.mouse.y - y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH
            x += (dx / dist) * force
            y += (dy / dist) * force
          }
        }

        node.x = x
        node.y = y
      }
    }

    const draw = (time: number) => {
      const { colors } = state
      const w = window.innerWidth
      const h = window.innerHeight
      const scale = Math.max(w / VIEW_W, h / VIEW_H)
      const offsetX = (w - VIEW_W * scale) / 2
      const offsetY = (h - VIEW_H * scale) / 2

      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(offsetX, offsetY)
      ctx.scale(scale, scale)

      const breathe = 0.55 + Math.sin(time * 0.0008) * 0.15

      for (const edge of edges) {
        const a = nodes[edge.a]
        const b = nodes[edge.b]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.hypot(dx, dy)
        const proximity = 1 - Math.min(dist / CONNECT_DIST, 1)
        const alpha = proximity * (0.25 + breathe * 0.35)

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = colors.line
        ctx.lineWidth = 1
        withAlpha(ctx, alpha, () => ctx.stroke())
      }

      if (!reducedMotion) {
        state.pulses = state.pulses.filter((pulse) => {
          pulse.t += pulse.speed
          if (pulse.t >= 1) return false

          const edge = edges[pulse.edgeIndex]
          if (!edge) return false

          const a = nodes[edge.a]
          const b = nodes[edge.b]
          const px = a.x + (b.x - a.x) * pulse.t
          const py = a.y + (b.y - a.y) * pulse.t

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = colors.primary
          ctx.lineWidth = 1.2
          withAlpha(ctx, 0.45 * (1 - pulse.t), () => ctx.stroke())

          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = colors.primary
          withAlpha(ctx, 1 - pulse.t * 0.5, () => ctx.fill())

          return true
        })
      }

      for (const node of nodes) {
        const pulse = 0.85 + Math.sin(time * 0.002 + node.phase) * 0.15

        if (node.isHub && !reducedMotion) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 4 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = colors.glow
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * (node.isHub ? pulse : 1), 0, Math.PI * 2)
        ctx.fillStyle = node.isHub ? colors.primary : colors.node
        ctx.fill()
      }

      ctx.restore()
    }

    const loop = (time: number) => {
      state.time = time
      if (!reducedMotion) {
        updateNodes(time)
      } else if (nodes[0].x === nodes[0].baseX) {
        for (const node of nodes) {
          node.x = node.baseX
          node.y = node.baseY
        }
      }
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    if (!reducedMotion) {
      pulseTimer = setInterval(() => spawnPulse(edges), 1800)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      if (pulseTimer) clearInterval(pulseTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [graph, reducedMotion, spawnPulse])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--accent-glow),transparent_55%)] opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,var(--accent-glow),transparent_45%)] opacity-40"
        aria-hidden="true"
      />
    </div>
  )
}
