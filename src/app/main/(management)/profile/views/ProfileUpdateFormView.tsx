'user client'

import { Button, FormHelperText, Grid, Stack, TextField } from '@mui/material'
import { UserType } from '../../users/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  profile: UserType | any
}

export default function ProfileUpdateFormView(props: Props) {
  const { profile } = props

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: profile?.name,
      document: profile?.document,
      email: profile?.email,
      phone: profile?.phone,
      zipCode: profile?.zipCode,
      street: profile?.street,
      complement: profile?.complement,
    },
  })
  const onSubmit: SubmitHandler<ProfileUpdateSchemaType> = async (inputs) => {
    console.log(inputs)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} width={'100%'}>
        <Grid
          gap={1}
          sx={{ display: 'flex', justifyContent: 'center' }}
          container
        >
          <Grid item xs={12} sm={12}>
            <TextField
              {...register('name')}
              fullWidth
              margin="normal"
              size="small"
              label="nome completo"
            />
            {errors.name && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.name.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={3.9}>
            <TextField
              {...register('document')}
              fullWidth
              margin="normal"
              size="small"
              label="documento"
            />
            {errors.document && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.document.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={3.9}>
            <TextField
              {...register('email')}
              fullWidth
              margin="normal"
              size="small"
              label="e-mail"
              type="email"
            />
            {errors.email && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.email.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={3.9}>
            <TextField
              {...register('phone')}
              fullWidth
              margin="normal"
              size="small"
              label="celular"
            />
            {errors.phone && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.phone.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              {...register('zipCode')}
              fullWidth
              margin="normal"
              size="small"
              label="cep"
            />
            {errors.zipCode && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.zipCode.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={9.8}>
            <TextField
              {...register('street')}
              fullWidth
              margin="normal"
              size="small"
              label="logradouro"
            />
            {errors.street && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.street.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register('complement')}
              fullWidth
              margin="normal"
              size="small"
              label="complemento"
            />
            {errors.complement && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.complement.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          atualizar informações
        </Button>
      </Stack>
    </form>
  )
}
