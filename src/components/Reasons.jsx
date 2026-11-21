import { useInView } from '../hooks/useInView.js'
import { reasons } from '../data/messages.js'

export default function Reasons() {
  const [ref, visible] = useInView({ threshold: 0.2 })
  return (
    <section className={`reasons ${visible ? 'is-visible' : ''}`} ref={ref}>
      <header className="reasons__head">
        <span className="section-kicker">Razones</span>
        <h2>Por qué te amo, mi amor mi  tesoro  mi  luz  </h2>
      </header>
      <ul className="reasons__grid">
        {reasons.map((r, i) => (
          <li key={r} className="reasons__card" style={{ '--i': i }}>
            <span className="reasons__num">{i + 1}</span>
            <p>{r}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
