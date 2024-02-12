'use client'

import {
  CreateOrderAttachmentSchema,
  CreateOrderAttachmentSchemaType,
} from '@/app/main/(management)/orders/attachments/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
}

export default function CreateOrderAttachmentFromMyOrganization(props: Props) {
  const { authorizationKey, onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrderAttachmentSchemaType>({
    resolver: zodResolver(CreateOrderAttachmentSchema),
  })
  const onSubmit: SubmitHandler<CreateOrderAttachmentSchemaType> = async (
    inputs,
  ) => {
    console.log({ ...inputs }, authorizationKey)
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
        adicionar evidência ao pedido
      </Button>
    </Box>
  )
}
