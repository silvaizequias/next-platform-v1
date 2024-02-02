'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { SignUpSchema, SignUpSchemaType } from '../schema'
import { actionSignUp } from '../actions'
import { useRouter } from 'next/navigation'

export default function SignUpFormView() {
  const randomCode = Math.random().toString(32).substr(2, 16)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (inputs) => {
    const result = await actionSignUp({ ...inputs, password: randomCode })
    if (result?.response?.error) {
      alert(result?.message)
    } else {
      alert(result)
      await signIn('credentials', {
        redirect: false,
        phone: inputs?.phone,
        password: randomCode,
      }).then((res: any) => {
        if (!res.ok) {
          alert(res?.error)
        } else {
          alert(`boas vindas a dedicado ${inputs?.name}`)
          router.refresh()
        }
      })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ my: 2 }}
    >
      <Typography component="h6" variant="body1" align="center">
        preencha os campos do formulário para registrar-se na plataforma
      </Typography>

      <TextField
        {...register('name')}
        margin="normal"
        size="small"
        required
        fullWidth
        id="name"
        label="nome completo"
        autoFocus
      />
      {errors.name && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {errors.name.message}
        </FormHelperText>
      )}

      <TextField
        {...register('email')}
        margin="normal"
        size="small"
        required
        fullWidth
        id="email"
        label="e-mail"
        autoFocus
      />
      {errors.email && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {errors.email.message}
        </FormHelperText>
      )}

      <TextField
        {...register('phone')}
        margin="normal"
        size="small"
        required
        fullWidth
        id="phone"
        label="celular"
        autoFocus
      />
      {errors.phone && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {errors.phone.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        registrar-se
      </Button>
    </Box>
  )
}
