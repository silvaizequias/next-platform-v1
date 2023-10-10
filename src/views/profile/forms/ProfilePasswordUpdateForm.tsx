import {
  UserPasswordUpdateSchema,
  UserPasswordUpdateSchemaType,
} from '@/types/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import { signOut } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ProfileProps } from '../types'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ProfilePasswordUpdateForm(props: ProfileProps) {
  const { user } = props
  const userId = user?.id!

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UserPasswordUpdateSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserPasswordUpdateSchema),
  })

  const onSubmit: SubmitHandler<UserPasswordUpdateSchemaType> = async (
    inputs,
  ) => {
    try {
      await axios
        .patch(`/api/users/password-update/${userId}`, inputs)
        .then(async (res: any) => {
          toast.success(res.data)
          reset({
            password: '',
            newPassword: '',
            confirmNewPassword: '',
          })
          signOut()
        })
        .catch((error: any) => {
          toast.error(error?.response?.data || error?.message)
        })
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <Controller
              {...register('password')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Senha Atual'}
                  type={'password'}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.password)}
                  placeholder='********'
                />
              )}
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('newPassword')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Nova Senha'}
                  type={'password'}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.newPassword)}
                  placeholder='********'
                />
              )}
            />
            {errors.newPassword && (
              <FormHelperText>{errors.newPassword.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('confirmNewPassword')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Confirme a Nova Senha'}
                  type={'password'}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.confirmNewPassword)}
                  placeholder='********'
                />
              )}
            />
            {errors.confirmNewPassword && (
              <FormHelperText>
                {errors.confirmNewPassword.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            color='warning'
          >
            Atualizar Senha
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
