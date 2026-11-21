import { useEffect, useState } from 'react'

// Progreso de scroll de toda la página (0 a 1) y posición Y para el parallax.
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, y: 0 })

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setState({ progress: max > 0 ? y / max : 0, y })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return state
}
