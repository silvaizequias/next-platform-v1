'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInSchema, SignInSchemaType } from '../schema'
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { grey } from '@mui/material/colors'

export default function SignInFormView() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = async (inputs) => {
    return await signIn('credentials', {
      redirect: false,
      phone: inputs?.phone,
      password: inputs?.password,
    }).then((res: any) => {
      if (!res.ok) {
        toast.error(res?.error)
      } else {
        toast.success('boas vindas a dedicado')
        router.refresh()
      }
    })
  }

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ my: 2, width: '100%', bgcolor: grey[50], p: 2, borderRadius: 1 }}
    >
      <Typography component="h6" variant="body1" align="center">
        informe suas credenciais para autenticar-se na plataforma
      </Typography>
      <TextField
        {...register('phone')}
        margin="normal"
        size="small"
        required
        fullWidth
        id="phone"
        label="celular"
        type='number'
        autoFocus
      />
      {errors.phone && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.phone.message}
        </FormHelperText>
      )}

      <TextField
        {...register('password')}
        margin="normal"
        size="small"
        required
        fullWidth
        id="password"
        type="password"
        label="senha"
        autoFocus
      />
      {errors.password && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.password.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        autenticar-se
      </Button>
    </Box>
  )
}
