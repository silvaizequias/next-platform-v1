import { Marker, Popup } from 'react-map-gl'
import { MapBoxMarkerProps } from './types'
import { Fragment, useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { MdLocationOn } from 'react-icons/md'
import { red } from '@mui/material/colors'

export default function MapBoxMarker(props: MapBoxMarkerProps) {
  const { children, id, latitude, longitude } = props
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const handlePopup = () => {
    setOpenPopup(!openPopup)
  }

  return (
    <Fragment>
      <Marker latitude={latitude} longitude={longitude} key={id}>
        <Tooltip title={latitude + ',' + longitude}>
          <IconButton
            sx={{
              fontSize: 32,
              color: red[400],
            }}
            onClick={handlePopup}
          >
            {<MdLocationOn />}
          </IconButton>
        </Tooltip>
      </Marker>
      {openPopup && (
        <Popup
          key={id}
          latitude={latitude}
          longitude={longitude}
          onClose={handlePopup}
          closeButton={true}
          closeOnClick={false}
          offset={25}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 150,
              minHeight: 50,
              fontSize: 12,
            }}
          >
            {children}
          </Box>
        </Popup>
      )}
    </Fragment>
  )
}
