'use client'

import {
  CreateOrderItemSchema,
  CreateOrderItemSchemaType,
} from '@/app/main/(management)/orders/items/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
}

export default function CreateOrderItemFromMyOrganization(props: Props) {
  const { authorizationKey, onClose } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateOrderItemSchemaType>({
    resolver: zodResolver(CreateOrderItemSchema),
  })
  const onSubmit: SubmitHandler<CreateOrderItemSchemaType> = async (inputs) => {
    console.log({ ...inputs }, authorizationKey)
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
        {...register('orderCode')}
        margin="normal"
        size="small"
        fullWidth
        label="código do pedido"
      />
      {errors.orderCode && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.orderCode.message}
        </FormHelperText>
      )}

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
        adicionar item ao pedido
      </Button>
    </Box>
  )
}
