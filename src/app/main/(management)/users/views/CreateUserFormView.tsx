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
import toast from 'react-hot-toast'
import getAddress from '@/utils/get-address'
import { actionCreateUser } from '../actions'
import { useSession } from 'next-auth/react'

export default function CreateUserFormView({
  onClose,
}: {
  onClose: () => void
}) {
  const { data: session } = useSession()
  const [zipCode, setZipCode] = useState<string | undefined>()
  const [address, setAddress] = useState<any>(null)
  const [profile, setProfile] = useState<string>(
    'master' || 'member' || 'consumer' || 'guest',
  )

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      street: address?.street,
      latitude: address?.latitude,
      longitude: address?.longitude,
    },
  })

  const loadZipCode = async (event: { target: { value: any } }) => {
    const data = event.target.value?.replace(/[^0-9]/g, '')

    if (data?.length !== 8) {
      toast.error('cep inválido')
      setZipCode(undefined)
    } else {
      setZipCode(data)
      const address = await getAddress(data)
      if (address?.code) {
        toast.error(address?.message)
      } else {
        address && setAddress(address)
        setValue('street', address?.address)
        setValue('latitude', Number(address?.lat))
        setValue('longitude', Number(address?.lng))
      }
    }
  }

  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (inputs) => {
    const result = await actionCreateUser(session!, { ...inputs })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      onClose()
    }
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

      <TextField
        {...register('zipCode')}
        margin="normal"
        size="small"
        fullWidth
        label="cep"
        onBlur={loadZipCode}
      />
      {errors.zipCode && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.zipCode.message}
        </FormHelperText>
      )}

      <TextField
        {...register('street')}
        margin="normal"
        size="small"
        fullWidth
        label="logradouro"
        disabled={!zipCode}
      />
      {errors.street && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.street.message}
        </FormHelperText>
      )}

      <TextField
        {...register('complement')}
        margin="normal"
        size="small"
        fullWidth
        label="complemento"
        disabled={!zipCode}
      />
      {errors.complement && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.complement.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        criar usuário
      </Button>
    </Box>
  )
}
