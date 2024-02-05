'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { actionResetPassword } from '../actions'
import { useRouter } from 'next/navigation'
import { ResetPasswordSchema, ResetPasswordSchemaType } from '../schema'

export default function ResetPasswordFormView() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (inputs) => {
    const result = await actionResetPassword(inputs)
    if (result?.response?.error) {
      alert(result?.message)
    } else {
      alert(result)
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
        um código de segurança será enviado para o número de telefone registrado
        na plataforma
      </Typography>

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
        redefinir a senha
      </Button>
    </Box>
  )
}
