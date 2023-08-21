import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthResetPasswordType>({
    resolver: yupResolver(AuthResetPassword),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/reset-password`, inputs)
        .then((res) => {})
        .catch((error: any) => {
          return new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='E-mail'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.email)}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='phone'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='Celular'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.phone)}
              placeholder='11 98765 4321'
            />
          )}
        />
        {errors.phone && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.phone.message}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        color='warning'
        sx={{ mb: 2 }}
      >
        Redefinir Senha
      </Button>
    </form>
  )
}
