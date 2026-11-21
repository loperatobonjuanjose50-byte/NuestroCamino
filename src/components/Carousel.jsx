import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView.js'

const AUTOPLAY_MS = 5500

export default function Carousel({ photos }) {
  const [ref, visible] = useInView({ threshold: 0.15 })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef(null)
  const total = photos.length

  const go = useCallback((i) => setIndex(((i % total) + total) % total), [total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (paused || !visible) return
    const t = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, visible, next, index])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  const onPointerDown = (e) => { startX.current = e.clientX; setPaused(true) }
  const onPointerUp = (e) => {
    if (startX.current !== null) {
      const dx = e.clientX - startX.current
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    }
    startX.current = null
    setPaused(false)
  }

  const current = photos[index]

  return (
    <section className={`carousel ${visible ? 'is-visible' : ''}`} ref={ref} id="galeria">
      <header className="carousel__head">
        <span className="section-kicker">Galería</span>
        <h2>Un año en imágenes</h2>
        <p>Desliza o usa las flechas para recorrer nuestros momentos.</p>
      </header>

      <div
        className="carousel__stage"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { startX.current = null; setPaused(false) }}
        aria-roledescription="carrusel"
        aria-label="Carrusel de fotos"
      >
        <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((p, i) => (
            <div className="carousel__slide" key={p.src} aria-hidden={i !== index}>
              <div className="carousel__bg" style={{ backgroundImage: `url(${p.src})` }} />
              <img src={p.src} alt={p.alt} draggable="false" loading="lazy" />
            </div>
          ))}
        </div>

        <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Foto anterior">‹</button>
        <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Foto siguiente">›</button>

        <div className="carousel__caption" key={index}>
          <h3>{current.title}</h3>
          <p>{current.message}</p>
        </div>

        {!paused && visible && <div className="carousel__timer" key={`t-${index}`} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
      </div>

      <div className="carousel__dots" role="tablist">
        {photos.map((p, i) => (
          <button
            key={p.src}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir a la foto ${i + 1}`}
            className={`carousel__thumb ${i === index ? 'is-active' : ''}`}
            onClick={() => go(i)}
          >
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  )
}
