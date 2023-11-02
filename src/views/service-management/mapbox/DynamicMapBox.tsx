import MapBox from '@/components/mapbox'
import MapBoxMarker from '@/components/mapbox/MapBoxMarker'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function DynamicMapBox() {
  const locations = [
    {
      customer: 'Comprão Supermercados',
      lat: -27.577453574141693,
      long: -48.623970673489325,
    },
    {
      customer: 'Koerich',
      lat: -27.603148171958107,
      long: -48.50631327643173,
    },
    {
      customer: 'Móveis Simonetti',
      lat: -27.51120779639038,
      long: -48.6628504183896,
    },
    {
      customer: 'Lavanderia Silva',
      lat: -27.67364136863868,
      long: -48.688939942049245,
    },
    {
      customer: 'Sudeste Motos',
      lat: -27.444662105643697,
      long: -48.631542989998024,
    },
    {
      customer: 'Farmácia Page Menos',
      lat: -27.669020255676353,
      long: -48.48348494322955,
    },
  ]

  return (
    <MapBox
      latitude={-27.570231674223447}
      longitude={-48.62897238835584}
      zoom={8}
    >
      {locations.map((location: any) => (
        <MapBoxMarker
          key={location?.lat!}
          id={location?.lat!}
          latitude={location?.lat!}
          longitude={location?.long!}
        >
          <Typography sx={{ color: grey[800], textAlign: 'center' }}>
            {location.customer!}
          </Typography>
        </MapBoxMarker>
      ))}
    </MapBox>
  )
}
