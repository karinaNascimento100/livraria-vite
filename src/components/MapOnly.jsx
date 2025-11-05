import React from 'react'

export default function MapOnly() {
  const address = 'Senai CIMATEC, Av. Orlando Gomes, 1845 - Piatã, Salvador - BA, 41650-010'
  const encoded = encodeURIComponent(address)
  const mapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  if (apiKey) {
    const iframeSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encoded}`
    return (
      <div className="max-w-4xl mx-auto">
        <iframe
          className="rounded-lg w-full"
          src={iframeSrc}
          height="480"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa CIMATEC (Google Maps)"
        />
        <div className="mt-2 flex gap-2">
          <a href={mapsWebUrl} target="_blank" rel="noopener noreferrer" className="button">Abrir no Google Maps</a>
          <a href={mapsDirUrl} target="_blank" rel="noopener noreferrer" className="button">Como chegar</a>
        </div>
      </div>
    )
  }

  // Fallback: OpenStreetMap
  const lat = -12.9391787
  const lon = -38.3866934
  const delta = 0.00005
  const minLon = lon - delta
  const maxLon = lon + delta
  const minLat = lat - delta
  const maxLat = lat + delta
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${lat},${lon}`

  return (
    <div className="max-w-4xl mx-auto">
      <iframe
        className="rounded-lg w-full"
        src={osmSrc}
        height="480"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa CIMATEC (OpenStreetMap)"
      />
      <div className="mt-2 flex gap-2">
        <a href={mapsWebUrl} target="_blank" rel="noopener noreferrer" className="button">Abrir no Google Maps</a>
        <a href={mapsDirUrl} target="_blank" rel="noopener noreferrer" className="button">Como chegar</a>
      </div>
    </div>
  )
}
