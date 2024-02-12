'use client'

import {
  UpdateOrderAttachmentSchema,
  UpdateOrderAttachmentSchemaType,
} from '@/app/main/(management)/orders/attachments/schema'
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  attachment: OrderAttachmentType
  authorizationKey: string
  onClose: () => void
}

export default function UpdateOrderAttachmentFromMyOrganization(props: Props) {
  const { attachment, authorizationKey, onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrderAttachmentSchemaType>({
    resolver: zodResolver(UpdateOrderAttachmentSchema),
  })
  const onSubmit: SubmitHandler<UpdateOrderAttachmentSchemaType> = async (
    inputs,
  ) => {
    console.log(authorizationKey, { ...inputs }, attachment?.id)
    onClose()
  }

  return (
    <Box
      sx={{ my: 2, width: '100%' }}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar evidência ao pedido
      </Button>
    </Box>
  )
}
