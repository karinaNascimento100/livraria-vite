import React, { useState, useEffect, useRef, useCallback } from 'react'

// util: gera srcSet com 3 larguras comuns (funciona bem com Unsplash)
function makeSrcSet(url) {
  const sep = url.includes('?') ? '&' : '?'
  const u = (w, q = 80) => `${url}${sep}w=${w}&auto=format&fit=crop&q=${q}`
  return `${u(1024, 70)} 1024w, ${u(1600, 75)} 1600w, ${u(1920, 80)} 1920w`
}

export default function BannerCarousel({
  slides,
  // Preenche a primeira tela: altura = viewport - altura do header (68px)
  heightClass = 'min-h-[calc(100vh-68px)] h-[calc(100vh-68px)]',
  autoPlay = true,
  intervalMs = 6000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  fit = 'cover',
  position = 'center center',
  maxWidth,
}) {
  // slides HD por padrão (tema biblioteca/azulado)
  const defaultSlides = [
    { src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66', alt: 'Modern library hall', bg: '#0a2236' },
  // Slide 2: imagem remota (corrigido fechamento de string)
  { src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600', alt: 'Library shelves new', bg: '#0a2236', fallbackSrc: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
    { src: 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600', alt: 'Study desks and lamps', bg: '#0a2a4a' },
  ]

  const slidesList = (slides && slides.length ? slides : defaultSlides).map(s => {
    const isRemote = /^https?:/.test(s.src)
    return {
      ...s,
      srcSet: s.srcSet ?? (isRemote ? makeSrcSet(s.src) : undefined),
    }
  })

  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(() => Array(slidesList.length).fill(false))
  const total = slidesList.length
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  const isHoveringRef = useRef(false)
  const isFocusedRef = useRef(false)

  const goTo = useCallback((i) => {
    setIndex((i % total + total) % total)
  }, [total])

  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    clearTimer()
    if (!autoPlay) return
    if (isHoveringRef.current || isFocusedRef.current) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, intervalMs)
    return clearTimer
  }, [index, autoPlay, intervalMs, total, clearTimer])

  // pré-carrega o primeiro banner (para evitar flash em telas grandes)
  useEffect(() => {
    const img = new Image()
    const first = slidesList[0]
    img.src = `${first.src}?w=1920&auto=format&fit=crop&q=80`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // swipe
  const startX = useRef(0)
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    const TH = 30
    if (dx > TH) prev()
    else if (dx < -TH) next()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section
      className={`relative w-full overflow-hidden ${heightClass} bg-neutral-200`}
      aria-roledescription="carousel"
      aria-label="Banners"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={() => { isFocusedRef.current = true; clearTimer() }}
      onBlur={() => { isFocusedRef.current = false }}
      onMouseEnter={() => { if (pauseOnHover) { isHoveringRef.current = true; clearTimer() } }}
      onMouseLeave={() => { if (pauseOnHover) { isHoveringRef.current = false } }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth, marginInline: 'auto' } : undefined}
    >
      {/* trilho */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slidesList.map((s, i) => {
          const isCover = (s.fit ?? fit) === 'cover'
          const bg = s.bg ?? '#0c1a2b'
          return (
            <div key={i} className="min-w-full h-full relative" style={{ background: bg }}>
              {/* skeleton enquanto carrega */}
              {!loaded[i] && (
                <div className="absolute inset-0 animate-pulse" style={{ background: bg }} />
              )}

              <img
                src={/^https?:/.test(s.src) ? `${s.src}${s.src.includes('?') ? '&' : '?'}w=1920&auto=format&fit=crop&q=80` : s.src}
                srcSet={/^https?:/.test(s.src) ? (s.srcSet ?? makeSrcSet(s.src)) : s.srcSet}
                sizes="(max-width: 768px) 100vw, 1920px"
                alt={s.alt ?? `Banner ${i + 1}`}
                className={`w-full h-full ${isCover ? 'object-cover' : 'object-contain'} select-none`}
                style={{ objectPosition: s.position ?? position }}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                onLoad={() => setLoaded(prev => { const copy = [...prev]; copy[i] = true; return copy })}
                onError={(e) => {
                  if (s.fallbackSrc && e.currentTarget.src !== s.fallbackSrc) {
                    console.warn('[BannerCarousel] Falha ao carregar imagem:', s.src, '→ usando fallback')
                    e.currentTarget.src = s.fallbackSrc
                  }
                }}
              />

              {/* overlay para contraste */}
              <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.35) 100%)' }} />
            </div>
          )
        })}
      </div>

      {/* setas */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition"
          >‹</button>
          <button
            onClick={next}
            aria-label="Próximo"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition"
          >›</button>
        </>
      )}

      {/* dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slidesList.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para banner ${i + 1}`}
              aria-current={i === index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-white scale-125 shadow' : 'bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
