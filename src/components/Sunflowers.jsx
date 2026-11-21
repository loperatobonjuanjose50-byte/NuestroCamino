import { useInView } from '../hooks/useInView.js'
import Sunflower from './Sunflower.jsx'
import { sunflowerMessage } from '../data/messages.js'

const FLOWERS = [
  { size: 90, height: 150, delay: 0.1, sway: 5.2 },
  { size: 130, height: 230, delay: 0.35, sway: 6.1 },
  { size: 100, height: 180, delay: 0.6, sway: 4.8 },
  { size: 150, height: 280, delay: 0.2, sway: 6.8 },
  { size: 110, height: 200, delay: 0.5, sway: 5.5 },
  { size: 130, height: 240, delay: 0.75, sway: 6.3 },
  { size: 90, height: 160, delay: 0.9, sway: 5 },
]

export default function Sunflowers() {
  const [ref, visible] = useInView({ threshold: 0.3 })

  return (
    <section className={`sunflowers ${visible ? 'is-visible' : ''}`} ref={ref} id="girasoles">
      <div className="sunflowers__sky" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="firefly" style={{ '--x': `${(i * 37) % 100}%`, '--y': `${(i * 53) % 70}%`, '--t': `${3 + (i % 5)}s`, '--d': `${(i % 7) * 0.6}s` }} />
        ))}
      </div>

      <div className="sunflowers__content">
        <span className="section-kicker section-kicker--gold">Para ti</span>
        <h2>Tus girasoles</h2>

        <div className="sunflowers__card">
          {sunflowerMessage.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <span className="sunflowers__sign">{sunflowerMessage.signature}</span>
        </div>
      </div>

      <div className="sunflowers__field" aria-hidden="true">
        {FLOWERS.map((f, i) => <Sunflower key={i} {...f} />)}
      </div>
      <div className="sunflowers__ground" aria-hidden="true" />
    </section>
  )
}
