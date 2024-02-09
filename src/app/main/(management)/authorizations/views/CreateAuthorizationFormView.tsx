'use client'

import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  CreateAuthorizationSchema,
  CreateAuthorizationSchemaType,
} from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { actionCreateOrganizationKey } from '../actions'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function CreateAuthorizationFormView() {
  const { data: session } = useSession()
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
    const result = await actionCreateOrganizationKey(session!, { ...inputs })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
    }
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
