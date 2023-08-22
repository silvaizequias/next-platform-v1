import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignUpSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(AuthSignUpSchema),
  })

  const onSubmit: SubmitHandler<AuthSignUpSchemaType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/signup`, inputs)
        .then((res: any) => {
          alert(
            JSON.stringify(
              `Seja bem vindo ${res.data?.name}! Sua senha de acesso foi enviada para o e-mail ${res.data?.email}`,
            ),
          )
        })
        .catch((error: any) => {
          alert(JSON.stringify(error?.message || error))
          new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='Nome Completo'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.name)}
              placeholder='Nome e Sobrenome'
            />
          )}
        />
        {errors.name && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.name.message}
          </FormHelperText>
        )}
      </FormControl>
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
        color='success'
        sx={{ mb: 2 }}
        startIcon={<AppRegistrationIcon />}
      >
        Registrar-se
      </Button>
    </form>
  )
}
