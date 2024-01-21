'use client'

import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  content?: string
  onClose: () => void
  open: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  title?: string
}

export default function DialogModal(props: Props) {
  const { children, content, onClose, open, size, title } = props

  return (
    <Dialog open={open} handler={onClose} size={size || 'xs'} className="p-4">
      <div className="flex items-center justify-between">
        <DialogHeader className="tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase">
          {title}
        </DialogHeader>
        <DialogHeader>
          <IconButton
            variant="text"
            className="rounded-full"
            color="red"
            size="sm"
            onClick={onClose}
          >
            x
          </IconButton>
        </DialogHeader>
      </div>
      <DialogBody className="flex flex-col justify-center items-center gap-2">
        <Typography variant="h6" className="text-center italic">
          {content}
        </Typography>
        {children}
      </DialogBody>
    </Dialog>
  )
}
