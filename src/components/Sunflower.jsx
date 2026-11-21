// Girasol en SVG. `height` controla la altura del tallo, `delay` el momento en que crece.
const PETALS = 18

export default function Sunflower({ height = 200, size = 120, delay = 0, sway = 0 }) {
  const stemH = height
  const w = size
  const cx = w / 2
  const total = stemH + w

  return (
    <div
      className="sunflower"
      style={{ width: w, aspectRatio: `${w} / ${total}`, '--delay': `${delay}s`, '--sway': `${sway}s` }}
    >
      <svg viewBox={`0 0 ${w} ${total}`} width={w} height={total} aria-hidden="true">
        <defs>
          <radialGradient id={`c-${size}-${height}`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#6b3d12" />
            <stop offset="70%" stopColor="#3d2209" />
            <stop offset="100%" stopColor="#2a1605" />
          </radialGradient>
        </defs>

        <g className="sunflower__stem">
          <path d={`M${cx} ${w * 0.7} C ${cx - 6} ${w * 0.7 + stemH * 0.4}, ${cx + 6} ${w * 0.7 + stemH * 0.7}, ${cx} ${total}`}
            stroke="#2f8f57" strokeWidth={Math.max(4, w * 0.045)} strokeLinecap="round" fill="none" />
          <path d={`M${cx} ${w * 0.7 + stemH * 0.55} q ${w * 0.35} -${w * 0.12} ${w * 0.4} ${w * 0.1} q -${w * 0.25} ${w * 0.1} -${w * 0.4} -${w * 0.1}z`} fill="#3aa86a" />
          <path d={`M${cx} ${w * 0.7 + stemH * 0.75} q -${w * 0.35} -${w * 0.12} -${w * 0.4} ${w * 0.1} q ${w * 0.25} ${w * 0.1} ${w * 0.4} -${w * 0.1}z`} fill="#2f8f57" />
        </g>

        <g className="sunflower__head" style={{ transformOrigin: `${cx}px ${w / 2}px` }}>
          <g className="sunflower__petals" style={{ transformOrigin: `${cx}px ${w / 2}px` }}>
            {Array.from({ length: PETALS }, (_, i) => (
              <ellipse key={`b${i}`} cx={cx} cy={w * 0.16} rx={w * 0.075} ry={w * 0.2}
                fill="#f2b705" transform={`rotate(${(360 / PETALS) * i + 10} ${cx} ${w / 2})`} />
            ))}
            {Array.from({ length: PETALS }, (_, i) => (
              <ellipse key={`f${i}`} cx={cx} cy={w * 0.19} rx={w * 0.07} ry={w * 0.18}
                fill="#ffd93b" transform={`rotate(${(360 / PETALS) * i} ${cx} ${w / 2})`} />
            ))}
          </g>
          <circle cx={cx} cy={w / 2} r={w * 0.19} fill={`url(#c-${size}-${height})`} />
          {Array.from({ length: 24 }, (_, i) => {
            const a = i * 2.399963
            const r = w * 0.17 * Math.sqrt((i + 1) / 24)
            return <circle key={i} cx={cx + Math.cos(a) * r} cy={w / 2 + Math.sin(a) * r} r={w * 0.012} fill="#8a5a22" opacity="0.8" />
          })}
        </g>
      </svg>
    </div>
  )
}
