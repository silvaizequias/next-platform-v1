'use client'

import {
  UpdateOrderItemSchema,
  UpdateOrderItemSchemaType,
} from '@/app/main/(management)/orders/items/schema'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
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
    reset,
  } = useForm<UpdateOrderItemSchemaType>({
    resolver: zodResolver(UpdateOrderItemSchema),
    defaultValues: {
      note: item?.note,
      amount: item?.amount,
      file: item?.file,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderItemSchemaType> = async (inputs) => {
    console.log(authorizationKey, { ...inputs }, item?.id)
    reset()
    onClose()
  }

  return (
    <Box
      sx={{ my: 2, width: '100%' }}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        {...register('note')}
        margin="normal"
        size="small"
        fullWidth
        label="observação"
      />
      {errors.note && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.note.message}
        </FormHelperText>
      )}

      <TextField
        {...register('amount')}
        margin="normal"
        size="small"
        fullWidth
        label="quantidade"
        type="number"
      />
      {errors.amount && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.amount.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar item ao pedido
      </Button>
    </Box>
  )
}
