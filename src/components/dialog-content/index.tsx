import { Dialog, DialogBody } from '@material-tailwind/react'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  onClose: () => void
  open: boolean
  session?: Session
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export default function DialogContent(props: Props) {
  const { children, onClose, open, session, size } = props

  return (
    <Dialog open={open} size={size || 'xs'} handler={onClose}>
      <DialogBody>
        {children}
      </DialogBody>
    </Dialog>
  )
}
