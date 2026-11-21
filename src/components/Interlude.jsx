import { useInView } from '../hooks/useInView.js'

// Frase corta entre secciones, con aparición suave.
export default function Interlude({ text }) {
  const [ref, visible] = useInView({ threshold: 0.5 })
  return (
    <section className="interlude" ref={ref}>
      <p className={`interlude__text ${visible ? 'is-visible' : ''}`}>
        <span className="interlude__mark">“</span>
        {text}
      </p>
    </section>
  )
}
