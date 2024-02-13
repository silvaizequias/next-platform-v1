'use client'

import {
  UpdateOrderSchema,
  UpdateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { OrderType } from '@/app/main/(management)/orders/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
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
    reset,
  } = useForm<UpdateOrderSchemaType>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      member: order?.member,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderSchemaType> = async (inputs) => {
    console.log(authorizationKey, { ...inputs }, order?.id)
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
        {...register('member')}
        margin="normal"
        size="small"
        fullWidth
        label="membro responsável"
        type="number"
      />
      {errors.member && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.member.message}
        </FormHelperText>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar pedido
      </Button>
    </Box>
  )
}
