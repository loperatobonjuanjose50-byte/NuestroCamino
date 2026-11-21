import { useScrollProgress } from '../hooks/useScrollProgress.js'

export default function ScrollProgress() {
  const { progress } = useScrollProgress()
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
