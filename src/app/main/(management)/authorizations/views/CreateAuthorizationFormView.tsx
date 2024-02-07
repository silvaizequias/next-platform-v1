'use client'

import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  CreateAuthorizationSchema,
  CreateAuthorizationSchemaType,
} from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function CreateAuthorizationFormView() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateAuthorizationSchemaType>({
    resolver: zodResolver(CreateAuthorizationSchema),
  })
  const onSubmit: SubmitHandler<CreateAuthorizationSchemaType> = async (
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
        {...register('organizationDocument')}
        margin="normal"
        size="small"
        required
        fullWidth
        label="organização"
        autoFocus
      />
      {errors.organizationDocument && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.organizationDocument.message}
        </FormHelperText>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        criar chave de autorização
      </Button>
    </Box>
  )
}
