'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateUserSchema, CreateUserSchemaType } from '../schema'
import { useState } from 'react'

export default function CreateUserFormView() {
  const [profile, setProfile] = useState<string>(
    'master' || 'member' || 'consumer' || 'guest',
  )

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
  })
  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (inputs) => {
    console.log(inputs)
  }

  return (
    <Box
      sx={{ my: 2, width: '100%' }}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Select
        {...register('profile')}
        margin="none"
        size="small"
        fullWidth
        label="perfil"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="master">master</MenuItem>
        <MenuItem value="member">membro</MenuItem>
        <MenuItem value="consumer">consumidor</MenuItem>
        <MenuItem value="guest">visitante</MenuItem>
      </Select>
      {errors.profile && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.profile.message}
        </FormHelperText>
      )}

      <TextField
        {...register('name')}
        margin="normal"
        size="small"
        fullWidth
        label="nome completo"
      />
      {errors.name && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.name.message}
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
        criar usuário
      </Button>
    </Box>
  )
}
