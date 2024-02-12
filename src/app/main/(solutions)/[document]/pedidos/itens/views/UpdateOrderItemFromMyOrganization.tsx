'use client'

import {
  UpdateOrderItemSchema,
  UpdateOrderItemSchemaType,
} from '@/app/main/(management)/orders/items/schema'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
  item: OrderItemType
}

export default function UpdateOrderItemFromMyOrganization(props: Props) {
  const { authorizationKey, onClose, item } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrderItemSchemaType>({
    resolver: zodResolver(UpdateOrderItemSchema),
  })
  const onSubmit: SubmitHandler<UpdateOrderItemSchemaType> = async (inputs) => {
    console.log(authorizationKey, { ...inputs }, item?.id)
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
        atualizar item ao pedido
      </Button>
    </Box>
  )
}
