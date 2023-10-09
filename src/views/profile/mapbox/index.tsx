import MapBox from '@/components/mapbox'
import MapBoxMarker from '@/components/mapbox/MapBoxMarker'
import { UserType } from '@/types/user'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { MdExpandMore } from 'react-icons/md'

interface Props {
  user: UserType
}

export default function UserAddressMapBox(props: Props) {
  const { user } = props

  const userId = user?.id!
  const userLatitude = user?.latitude!
  const userLongitude = user?.longitude!

  return (
    <Accordion>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        <Typography variant='button' color={blue[600]}>
          Ver no Mapa
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MapBox latitude={userLatitude} longitude={userLongitude} zoom={8}>
          <MapBoxMarker
            id={userId}
            latitude={userLatitude}
            longitude={userLongitude}
          >
            <Typography sx={{ color: grey[800], textAlign: 'center' }}>
              {`${user.street}, ${user.complement} - ${user.district}, ${user.city} - ${user.state}`}
            </Typography>
          </MapBoxMarker>
        </MapBox>
      </AccordionDetails>
    </Accordion>
  )
}
