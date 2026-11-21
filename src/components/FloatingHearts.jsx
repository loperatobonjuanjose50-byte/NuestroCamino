import { useState } from 'react'

const COUNT = 16

function makeHearts() {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 18,
    duration: 14 + Math.random() * 16,
    delay: -Math.random() * 30,
    drift: (Math.random() - 0.5) * 120,
    opacity: 0.12 + Math.random() * 0.25,
  }))
}

// Corazones azules que suben suavemente por toda la página.
export default function FloatingHearts() {
  const [hearts] = useState(makeHearts)
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-hearts__heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
            '--op': h.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}
