import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

import Link from 'next/link'

import axios from 'axios'

import toast from 'react-hot-toast'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Fragment, MouseEvent } from 'react'

import Icon from 'src/@core/components/icon'

import { useRouter } from 'next/router'

type InputForm = {
  name: string
  email: string
  phone: string
  acceptedTerms: boolean
  isActive: boolean
}

export default function SignUpForm() {
  const router = useRouter()

  const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/auth/signup'
  const validationSchema = yup.object().shape({
    name: yup.string().required('Informe seu nome completo').min(6).max(150),
    email: yup
      .string()
      .required('Informe seu endereço de e-mail')
      .email('Informe um e-mail válido')
      .max(150),
    phone: yup.string().required('Informe o número do seu celular').length(11),
    acceptedTerms: yup
      .boolean()
      .required('Precisa ler e aceitar os Termos de Privacidade'),
    isActive: yup.boolean().default(true),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = async (inputs) => {
    console.log(inputs)
    await axios
      .post(endpoint, inputs)
      .then(function () {
        toast.success(
          `${inputs.name} você foi registrado na Sistema Dedicado! Sua senha foi enviada para o e-mail ${inputs.email}!`,
        )
        router.push('/auth')
      })
      .catch(function (error) {
        console.log(error)
        toast.error(
          `${error.response?.status}: ${error.response?.data?.message?.message}!`,
        )
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          {...register('name')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='Seu Nome Completo'
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
          {...register('email')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='Seu E-mail'
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
          {...register('phone')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label='Número de Celular'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='48 98765 4321'
              error={Boolean(errors.phone)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='mdi:phone' />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {errors.phone && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.phone.message}
          </FormHelperText>
        )}
      </FormControl>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Controller
            {...register('acceptedTerms')}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <FormControlLabel
                control={
                  <Checkbox value={value} onBlur={onBlur} onChange={onChange} />
                }
                label={
                  <Fragment>
                    <span>Aceito </span>
                    <Typography
                      href='/'
                      variant='body2'
                      component={Link}
                      sx={{
                        color: 'secondary.main',
                        textDecoration: 'none',
                      }}
                      onClick={(e: MouseEvent<HTMLElement>) =>
                        e.preventDefault()
                      }
                    >
                      os Termos de Privacidade
                    </Typography>
                  </Fragment>
                }
              />
            )}
          />
          {errors.acceptedTerms && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {errors.acceptedTerms.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        color='info'
        sx={{ mb: 7 }}
      >
        Registrar-se
      </Button>
    </form>
  )
}
