import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'

import axios from 'axios'

import toast from 'react-hot-toast'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Fragment, MouseEvent } from 'react'

interface Props {
  open: boolean
  onClose: React.ReactEventHandler
}

type InputForm = {
  companyCnpj: string
  name: string
  email: string
  phone: number
  role: string
  isActive: string
  acceptedTerms: boolean
}

export default function HeaderRegisterDialog({ open, onClose }: Props) {
  const endpoint = ''
  const validationSchema = yup.object().shape({
    companyCnpj: yup.string().default('41059953000102'),
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().required(),
    role: yup.string().default('GUEST'),
    isActive: yup.boolean().default(true),
    acceptedTerms: yup.boolean().required(),
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
    await axios
      .patch(endpoint, inputs)
      .then(function (response) {
        toast.success(
          `${response.data.name} você foi registrado, e sua senha foi enviada para o e-mail ${response.data.email}!`,
        )
      })
      .catch(function (error) {
        toast.error(
          `${error.response?.data?.error}: ${error.response?.data?.message}!`,
        )
      })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby=''
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 650,
          p: [2, 2],
        },
      }}
      aria-describedby=''
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          id=''
          sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
        >
          Registrar-se
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Controller
                  {...register('name')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Nome Completo'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Nome e Sobrenome'
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Controller
                  {...register('email')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='E-mail'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='seu@email.com'
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
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
                    />
                  )}
                />
                {errors.phone && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Controller
                  {...register('acceptedTerms')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mt: 5 }}>
          <Button
            variant='contained'
            color='info'
            sx={{ mr: 1 }}
            type='submit'
            onClick={onClose}
          >
            REGISTRAR-SE
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            CANCELAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
