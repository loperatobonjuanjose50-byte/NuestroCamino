import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'
import Hero from './components/Hero.jsx'
import Interlude from './components/Interlude.jsx'
import PhotoStory from './components/PhotoStory.jsx'
import Carousel from './components/Carousel.jsx'
import Reasons from './components/Reasons.jsx'
import Sunflowers from './components/Sunflowers.jsx'
import Finale from './components/Finale.jsx'
import { photos } from './data/photos.js'
import { interludes } from './data/messages.js'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <FloatingHearts />
      <main>
        <Hero />
        <Interlude text={interludes[0]} />

        {photos.slice(0, 3).map((p, i) => (
          <PhotoStory key={p.src} photo={p} index={i} />
        ))}
        <Interlude text={interludes[1]} />

        {photos.slice(3, 6).map((p, i) => (
          <PhotoStory key={p.src} photo={p} index={i + 3} />
        ))}
        <Interlude text={interludes[2]} />

        <Carousel photos={photos} />
        <Interlude text={interludes[3]} />

        {photos.slice(6).map((p, i) => (
          <PhotoStory key={p.src} photo={p} index={i + 6} />
        ))}

        <Reasons />
        <Interlude text={interludes[4]} />
        <Sunflowers />
        <Finale />
      </main>
    </>
  )
}
