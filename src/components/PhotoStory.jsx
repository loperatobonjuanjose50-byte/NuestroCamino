import { useRef, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView.js'

// Una foto con su mensaje. Alterna izquierda/derecha y tiene un parallax suave.
export default function PhotoStory({ photo, index }) {
  const [ref, visible] = useInView({ threshold: 0.25 })
  const frameRef = useRef(null)
  const [shift, setShift] = useState(0)
  const reverse = index % 2 === 1

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = frameRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2 - window.innerHeight / 2
      setShift(Math.max(-1, Math.min(1, center / window.innerHeight)) * -24)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section
      ref={ref}
      id={index === 0 ? 'historia' : undefined}
      className={`story ${reverse ? 'story--reverse' : ''} ${visible ? 'is-visible' : ''}`}
    >
      <div className="story__inner">
        <figure className="story__photo" ref={frameRef} style={{ '--shift': `${shift}px` }}>
          <div className="story__frame">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
          <span className="story__number">{String(index + 1).padStart(2, '0')}</span>
        </figure>

        <div className="story__text">
          <span className="story__kicker">Recuerdo {index + 1}</span>
          <h2>{photo.title}</h2>
          <p>{photo.message}</p>
          <span className="story__heart" aria-hidden="true">♥</span>
        </div>
      </div>
    </section>
  )
}
