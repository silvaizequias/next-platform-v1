'use client'

import {
  CreateOrderSchema,
  CreateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  onClose: () => void
}

export default function CreateOrderFromMyOrganization(props: Props) {
  const { authorizationKey, onClose } = props

  const params = useParams()
  const { document }: any = params

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<CreateOrderSchemaType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      organization: document,
    },
  })
  const onSubmit: SubmitHandler<CreateOrderSchemaType> = async (inputs) => {
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
        {...register('customer')}
        margin="normal"
        size="small"
        fullWidth
        label="cliente"
        type="number"
      />
      {errors.customer && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.customer.message}
        </FormHelperText>
      )}

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
        registrar pedido
      </Button>
    </Box>
  )
}
