import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import axios from 'axios'

import toast from 'react-hot-toast'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useSession } from 'next-auth/react'
import { useFetch } from 'src/hooks/useFetch'

interface Props {
  id: string
  open: boolean
  onClose: React.ReactEventHandler
}

type InputForm = {
  name: string
  email: string
  phone: string
}

export default function EditProfileDialog({ id, open, onClose }: Props) {
  const { data: session } = useSession()

  // @ts-ignore
  const authorization = session?.user?.authorization
  const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/users/' + id
  const options = {
    headers: { Authorization: `Bearer ${authorization}` },
  }
  const { data: user } = useFetch(endpoint, options)

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, 'Precisa ter no mínimo 5 caracteres')
      .max(120, 'O máximo são 120 caracteres')
      .default(user?.name),
    email: yup
      .string()
      .email('Precisar ser um e-mail válido')
      .min(5, 'Precisa ter no mínimo 5 caracteres')
      .max(120, 'O máximo são 120 caracteres')
      .default(user?.email),
    phone: yup
      .string()
      .length(11, 'Precisa ter 11 números')
      .default(user?.phone),
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
      .patch(endpoint, inputs, options)
      .then(function (response) {
        console.log(response)
        toast.success(`As informações foram atualizadas!`)
      })
      .catch(function (error) {
        console.log(error)
        toast.error(`${error?.code}: ${error?.message}!`)
      })
  }

  return user ? (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='user-view-edit'
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 650,
          p: [2, 10],
        },
      }}
      aria-describedby='user-view-edit-description'
    >
      <DialogTitle
        id='user-view-edit'
        sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
      >
        Atualizar Perfil
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText
            variant='body2'
            id='user-view-edit-description'
            sx={{ textAlign: 'center', mb: 10 }}
          >
            Suas informações estão seguras conosco!
          </DialogContentText>

          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  {...register('name')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Nome Completo'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      defaultValue={user?.name}
                      placeholder={user?.name}
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
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  {...register('email')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      type='email'
                      label='Email'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      defaultValue={user?.email}
                      placeholder={user?.email}
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
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  {...register('phone')}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      type='number'
                      label='WhatsApp'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      defaultValue={user?.phone}
                      placeholder={user?.phone}
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
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant='contained'
            type='submit'
            sx={{ mr: 1 }}
            onClick={onClose}
          >
            Atualizar
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  ) : null
}
