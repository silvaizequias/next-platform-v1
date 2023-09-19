import { useFetch } from '@/hooks/useFetch'
import { UserCreateSchema, UserCreateSchemaType } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { UserCreateFormProps } from '../types'

export default function UserCreateForm(props: UserCreateFormProps) {
  const { onClose } = props
  const [role, setRole] = useState<string>('USER')
  const [profile, setProfile] = useState<string>('GUEST')
  const { data, mutate } = useFetch('/api/users')

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<UserCreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(UserCreateSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [reset, isSubmitSuccessful])

  const onSubmit: SubmitHandler<UserCreateSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/users`, inputs)
        .then(async (res: any) => {
          onClose()
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
        })
        .catch((error: any) => {
          new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id='profile'>Perfil</InputLabel>
        <Select
          {...register('profile')}
          required
          autoFocus
          label={'Perfil'}
          value={profile}
          onChange={(e) => setProfile(e?.target?.value)}
          error={Boolean(errors.profile)}
        >
          <MenuItem value=''></MenuItem>
          <MenuItem value='MASTER'>MASTER</MenuItem>
          <MenuItem value='OWNER'>PROPRIETÁRIO</MenuItem>
          <MenuItem value='MEMBER'>MEMBRO</MenuItem>
          <MenuItem value='CUSTOMER'>CLIENTE</MenuItem>
          <MenuItem value='GUEST'>VISITANTE</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('name')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Nome Completo'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.name)}
              placeholder='Nome e Sobrenome'
            />
          )}
        />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('email')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'E-mail'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.email)}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && (
          <FormHelperText>{errors.email.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('phone')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Celular'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.phone)}
              placeholder='11 98765 4321'
            />
          )}
        />
        {errors.phone && (
          <FormHelperText>{errors.phone.message}</FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='success'
        sx={{ mb: 4 }}
      >
        Criar Usuário
      </Button>
    </form>
  )
}
