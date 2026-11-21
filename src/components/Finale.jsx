import { useInView } from '../hooks/useInView.js'
import { finalMessage } from '../data/messages.js'

export default function Finale() {
  const [ref, visible] = useInView({ threshold: 0.4 })
  return (
    <section className={`finale ${visible ? 'is-visible' : ''}`} ref={ref}>
      <div className="finale__heart" aria-hidden="true">♥</div>
      <h2>{finalMessage.title}</h2>
      <p>{finalMessage.text}</p>
      <span className="finale__sign">{finalMessage.signature}</span>
    </section>
  )
}
