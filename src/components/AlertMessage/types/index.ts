import { AlertColor } from '@mui/material'

export interface AlertMessageProps {
  message: string
  severity?: AlertColor | undefined
  positionY?: "top" | "bottom"
  positionX?: "center" | "right" | "left"
}
