'use client'

import { Layer, Source } from 'react-map-gl'

interface Props {
  routes: []
}

export default function MapBoxSource(props: Props) {
  const { routes } = props

  return routes?.length > 0 ? (
    <Source
      type="geojson"
      data={{
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: [...routes] },
        properties: null,
      }}
    >
      <Layer
        type="line"
        layout={{ 'line-join': 'round', 'line-cap': 'square' }}
        paint={{ 'line-color': 'green', 'line-width': 4 }}
      />
    </Source>
  ) : null
}
