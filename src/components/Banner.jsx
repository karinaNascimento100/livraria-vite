import React, { useEffect, useRef, useState, useCallback } from 'react'

export default function Banner({
  src,
  alt = 'Banner da livraria',
  className = '',
  heightClass = 'max-h-72',
  fit = 'cover', // cover ou contain
  position = 'center', // center, top, bottom
  // Imagens responsivas
  srcSet, // string ou array: [{ src, width?: number, density?: number }]
  sizes,  // string conforme atributo HTML sizes, ex.: "100vw"
  // Qualidade
  preventUpscale = true, // evita ampliar além do tamanho natural (muda para contain)
  fetchPriority = 'high', // high | low | auto
  decoding = 'async',
}) {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const [effectiveFit, setEffectiveFit] = useState(fit)
  // Fontes candidatas: principal → variações → placeholder SVG
  const fallbacks = [
    // Preferência: public/assets/img
    '/assets/img/FiguraBiblioteca.jpg',
    '/assets/img/figurabiblioteca.jpg',
    '/assets/img/figura-biblioteca.jpg',
  '/assets/img/FiguraBiblioteca.jpeg',
  '/assets/img/FiguraBiblioteca.PNG',
    '/assets/img/FiguraBiblioteca.png',
    // Alternativos (sem /assets)
    '/img/FiguraBiblioteca.jpg',
    '/img/figura-biblioteca.jpg',
  ]

  const placeholderSvg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<?xml version='1.0' encoding='UTF-8'?>" +
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 260'>" +
        "<defs>" +
        "<linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>" +
        "<stop offset='0%' stop-color='#0f172a'/>" +
        "<stop offset='100%' stop-color='#334155'/>" +
        "</linearGradient>" +
        "</defs>" +
        "<rect width='100%' height='100%' fill='url(#g)'/>" +
        "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'" +
        " fill='#e5e7eb' font-family='Segoe UI, Roboto, Arial' font-size='36'>Livraria Online</text>" +
        "</svg>"
    )

  const sources = [src, ...fallbacks].filter(Boolean)

  const handleError = (e) => {
    const img = e.currentTarget
    const next = img.dataset.next?.split('|') || []
    if (next.length > 0) {
      const [head, ...rest] = next
      if (isDev) console.warn('[Banner] tentando fonte alternativa:', head)
      img.src = head
      img.dataset.next = rest.join('|')
    } else {
      if (isDev) console.warn('[Banner] sem fontes válidas; exibindo placeholder')
      img.src = placeholderSvg
    }
  }

  const evaluateUpscale = useCallback(() => {
    if (!preventUpscale) return
    const img = imgRef.current
    const wrapper = containerRef.current
    if (!img || !wrapper) return

    const naturalW = img.naturalWidth || 0
    const naturalH = img.naturalHeight || 0
    if (!naturalW || !naturalH) return

    const wrapperW = wrapper.clientWidth || 0
    const wrapperH = wrapper.clientHeight || 0

  // Se o contêiner ampliaria a imagem, usar contain para evitar desfoque
    const willUpscaleW = wrapperW > naturalW
    const willUpscaleH = wrapperH > naturalH
    const shouldContain = (willUpscaleW || willUpscaleH)

    setEffectiveFit(shouldContain ? 'contain' : fit)
  }, [preventUpscale, fit])

  const handleLoad = () => {
    evaluateUpscale()
  }

  useEffect(() => {
    setEffectiveFit(fit)
    // re-evaluate on resize
    const onResize = () => evaluateUpscale()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [fit, evaluateUpscale])

  useEffect(() => {
    // also evaluate after mount in case image is cached
    const t = setTimeout(evaluateUpscale, 0)
    return () => clearTimeout(t)
  }, [evaluateUpscale])

  // Normalize srcSet prop
  let srcSetAttr
  if (Array.isArray(srcSet)) {
    srcSetAttr = srcSet
      .map((e) => {
        if (typeof e === 'string') return e
        if (e && e.src && (e.width || e.density)) {
          if (e.width) return `${e.src} ${e.width}w`
          if (e.density) return `${e.src} ${e.density}x`
        }
        return null
      })
      .filter(Boolean)
      .join(', ')
  } else if (typeof srcSet === 'string') {
    srcSetAttr = srcSet
  }

  const sizesAttr = typeof sizes === 'string' ? sizes : undefined

  const nextList = sources.slice(1).join('|')

  return (
    <div ref={containerRef} className={`w-full bg-black/5`}>
      <img
        ref={imgRef}
        src={sources[0]}
        data-next={nextList}
        onError={handleError}
        onLoad={handleLoad}
        alt={alt}
        className={`w-full ${heightClass} object-${effectiveFit} object-${position} ${className}`}
        srcSet={srcSetAttr}
        sizes={sizesAttr}
        decoding={decoding}
        fetchPriority={fetchPriority}
        loading="eager"
      />
    </div>
  )
}
