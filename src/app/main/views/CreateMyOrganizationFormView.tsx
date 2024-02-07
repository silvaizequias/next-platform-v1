'use client'

import {
  CreateOrganizationSchemaType,
  CreateOrganizationSchema,
} from '@/app/main/(management)/organizations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function CreateMyOrganizationFormView() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrganizationSchemaType>({
    resolver: zodResolver(CreateOrganizationSchema),
  })
  const onSubmit: SubmitHandler<CreateOrganizationSchemaType> = async (
    inputs,
  ) => {
    console.log(inputs)
  }

  return (
    <Box
      sx={{ my: 2, width: '100%' }}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        {...register('name')}
        margin="normal"
        size="small"
        fullWidth
        label="nome da organização"
      />
      {errors.name && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.name.message}
        </FormHelperText>
      )}

      <TextField
        {...register('document')}
        margin="normal"
        size="small"
        fullWidth
        label="documento"
      />
      {errors.document && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.document.message}
        </FormHelperText>
      )}

      <TextField
        {...register('email')}
        margin="normal"
        size="small"
        fullWidth
        label="email"
      />
      {errors.email && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.email.message}
        </FormHelperText>
      )}

      <TextField
        {...register('phone')}
        margin="normal"
        size="small"
        fullWidth
        label="telefone"
      />
      {errors.phone && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.phone.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        criar minha organização
      </Button>
    </Box>
  )
}
