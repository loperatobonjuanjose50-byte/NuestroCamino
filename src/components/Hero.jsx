import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { heroLines } from '../data/messages.js'

export default function Hero() {
  const { y } = useScrollProgress()
  const offset = Math.min(y, 900)

  return (
    <section className="hero" id="inicio">
      <div className="hero__stars" style={{ transform: `translateY(${offset * 0.25}px)` }} aria-hidden="true" />
      <div className="hero__glow" style={{ transform: `translateY(${offset * 0.4}px)` }} aria-hidden="true" />

      <div className="hero__content" style={{ transform: `translateY(${offset * 0.15}px)`, opacity: Math.max(0, 1 - offset / 700) }}>
        <p className="hero__eyebrow anim-rise" style={{ '--d': '0.1s' }}>Chichita &amp; Chichito</p>
        <h1 className="hero__title anim-rise" style={{ '--d': '0.35s' }}>
          Nuestro <span>primer año</span>
        </h1>
        <div className="hero__badge anim-pop" style={{ '--d': '0.7s' }}>
          <strong>1</strong>
          <small>año de amor</small>
        </div>
        {heroLines.map((line, i) => (
          <p key={line} className="hero__line anim-rise" style={{ '--d': `${1 + i * 0.4}s` }}>
            {line}
          </p>
        ))}
      </div>

      <a href="#historia" className="hero__scroll anim-rise" style={{ '--d': '2s' }} aria-label="Bajar a la historia">
        <span>Desliza hacia abajo</span>
        <i />
      </a>
    </section>
  )
}
