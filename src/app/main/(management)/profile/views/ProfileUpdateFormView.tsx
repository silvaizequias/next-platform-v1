'user client'

import { Box, Button, FormHelperText, Grid, TextField } from '@mui/material'
import { UserType } from '../../users/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { actionUpdateProfileInformation } from '../actions'
import toast from 'react-hot-toast'
import { useState } from 'react'
import getAddress from '@/utils/get-address'
import { useSession } from 'next-auth/react'

interface Props {
  profile: UserType | any
}

export default function ProfileUpdateFormView(props: Props) {
  const { profile } = props
  const { data: session } = useSession()
  const [zipCode, setZipCode] = useState<string | undefined>()
  const [address, setAddress] = useState<any>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
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
      latitude: profile?.latitude,
      longitude: profile?.longitude,
    },
  })

  const loadZipCode = async (event: { target: { value: any } }) => {
    const data = event.target.value?.replace(/[^0-9]/g, '')

    if (data?.length !== 8) {
      toast.error('cep inválido')
      setZipCode(undefined)
    } else {
      setZipCode(data)
      const address = await getAddress(data)
      if (address?.code) {
        toast.error(address?.message)
      } else {
        address && setAddress(address)
        setValue('street', address?.address)
        setValue('latitude', Number(address?.lat))
        setValue('longitude', Number(address?.lng))
      }
    }
  }

  const onSubmit: SubmitHandler<ProfileUpdateSchemaType> = async (inputs) => {
    const result = await actionUpdateProfileInformation(session!, {
      ...inputs,
    })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        gap={1}
        sx={{ display: 'flex', justifyContent: 'center' }}
        container
        component={'div'}
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
            onBlur={loadZipCode}
            focused
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
            disabled={!zipCode}
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
            disabled={!zipCode}
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
      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar informações
      </Button>
    </Box>
  )
}
