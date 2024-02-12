'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { SignUpSchema, SignUpSchemaType } from '../schema'
import { actionSignUp } from '../actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { grey } from '@mui/material/colors'
import { ChangeEvent, useState } from 'react'

export default function SignUpFormView() {
  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
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
      toast.error(result?.message)
    } else {
      toast.success(result)
      await signIn('credentials', {
        redirect: false,
        phone: inputs?.phone,
        password: randomCode,
      }).then((res: any) => {
        if (!res.ok) {
          toast.error(res?.error)
        } else {
          toast.success(`boas vindas a dedicado ${inputs?.name}`)
          router.refresh()
        }
      })
    }
  }

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ my: 2, width: '100%', bgcolor: grey[50], p: 2, borderRadius: 1 }}
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
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
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
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
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
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.phone.message}
        </FormHelperText>
      )}

      <FormControlLabel
        required
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={
          <Link href={'/termos-e-politicas'} variant="caption" underline="none">
            aceito os termos e políticas da plataforma
          </Link>
        }
      />

      <Button
        disabled={!checked}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2 }}
      >
        registrar-se
      </Button>
    </Box>
  )
}
