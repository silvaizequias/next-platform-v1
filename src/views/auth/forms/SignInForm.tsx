import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import { useState } from 'react'

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignInSchemaType>({
    resolver: yupResolver(AuthSignInSchema),
  })

  const onSubmit: SubmitHandler<AuthSignInSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    const { phone, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        phone: phone,
        password: password,
      })
        .then((res) => {
          if (!res?.error && res?.url) {
            router.refresh()
          } else {
            null
          }
        })
        .catch((error: any) => {})
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='Senha'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.password)}
              type={showPassword ? 'text' : 'password'}
              placeholder='**********'
            />
          )}
        />
        {errors.password && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        color='info'
        sx={{ mb: 2 }}
      >
        Autenticar-se
      </Button>
    </form>
  )
}
