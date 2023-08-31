import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { forwardRef } from 'react'
import { AlertMessageProps } from './types'

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  },
)

export default function AlertMessage(props: AlertMessageProps) {
  const { message, severity, positionX, positionY } = props

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: positionY || 'top',
        horizontal: positionX || 'center',
      }}
    >
      <Alert severity={severity || 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
