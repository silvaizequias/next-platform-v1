import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthResetPasswordType>({
    mode: 'onChange',
    resolver: zodResolver(AuthResetPassword),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/reset-password`, inputs)
        .then((res: any) => {
          toast.success(res.data!)
        })
        .catch((error: any) => {
          toast.error(error?.message)
        })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='email'
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
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='phone'
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
        color='info'
        sx={{ mb: 4 }}
      >
        Redefinir Senha
      </Button>
    </form>
  )
}
