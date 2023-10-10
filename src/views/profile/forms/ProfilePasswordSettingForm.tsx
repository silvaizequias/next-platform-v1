import {
  UserPasswordSettingSchema,
  UserPasswordSettingSchemaType,
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

export default function ProfilePasswordSettingForm(props: ProfileProps) {
  const { user } = props
  const userId = user?.id!

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UserPasswordSettingSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserPasswordSettingSchema),
  })

  const onSubmit: SubmitHandler<UserPasswordSettingSchemaType> = async (
    inputs,
  ) => {
    try {
      await axios
        .patch(`/api/users/password-setting/${userId}`, inputs)
        .then(async (res: any) => {
          toast.success(res.data)
          reset({
            password: '',
            confirmPassword: '',
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
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('password')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Nova Senha'}
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
              {...register('confirmPassword')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Confirme a Senha'}
                  type={'password'}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.confirmPassword)}
                  placeholder='********'
                />
              )}
            />
            {errors.confirmPassword && (
              <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            color='primary'
          >
            Definir Senha
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
