import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

export default function SignUpForm() {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignUpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSignUpSchema),
  })

  const handleGoogleSignUp = () => {
    signIn('google')
    router.push('/')
  }

  const onSubmit: SubmitHandler<AuthSignUpSchemaType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/signup`, inputs)
        .then((res: any) => {
          toast.success(res.data!)
        })
        .catch((error: any) => {
          toast.error(error?.message!)
        })
    } catch (error: any) {
      toast.error(error?.message!)
      console.error(error?.message! || error)
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
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Email'}
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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          fullWidth
          size='small'
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mb: 2 }}
        >
          Registrar-se
        </Button>
        <Divider textAlign='center' sx={{ fontSize: 12, color: grey[400] }}>
          ou
        </Divider>
        <Button
          size='small'
          variant='contained'
          color='info'
          sx={{ m: 2 }}
          onClick={handleGoogleSignUp}
          startIcon={<FcGoogle />}
        >
          Registrar-se com o Google
        </Button>
      </Box>
    </form>
  )
}
