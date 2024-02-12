'use client'

import {
  UpdateOrderSchema,
  UpdateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { OrderType } from '@/app/main/(management)/orders/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
  order: OrderType
}

export default function UpdateOrderFromMyOrganization(props: Props) {
  const { authorizationKey, onClose, order } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrderSchemaType>({
    resolver: zodResolver(UpdateOrderSchema),
  })
  const onSubmit: SubmitHandler<UpdateOrderSchemaType> = async (inputs) => {
    console.log(authorizationKey, { ...inputs }, order?.id)
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
        atualizar pedido
      </Button>
    </Box>
  )
}
