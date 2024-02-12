'use client'

import {
  CreateOrderSchema,
  CreateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
}

export default function CreateOrderFromMyOrganization(props: Props) {
  const { authorizationKey, onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrderSchemaType>({
    resolver: zodResolver(CreateOrderSchema),
  })
  const onSubmit: SubmitHandler<CreateOrderSchemaType> = async (inputs) => {
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
        registrar pedido
      </Button>
    </Box>
  )
}
