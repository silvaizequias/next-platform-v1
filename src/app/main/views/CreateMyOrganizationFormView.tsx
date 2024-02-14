'use client'

import {
  CreateOrganizationSchemaType,
  CreateOrganizationSchema,
} from '@/app/main/(management)/organizations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormHelperText,
  TextField,
  Tooltip,
  colors,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionCreateMyOrganization } from '../actions'
import toast from 'react-hot-toast'
import { Fragment, useCallback, useState } from 'react'
import getAddress from '@/utils/get-address'
import { useSession } from 'next-auth/react'
import { Add } from '@mui/icons-material'

export default function CreateMyOrganizationFormView() {
  const { data: session } = useSession()
  const [zipCode, setZipCode] = useState<string | undefined>()
  const [address, setAddress] = useState<any>(null)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreateOrganizationSchemaType>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: {
      street: address?.street,
      latitude: address?.latitude,
      longitude: address?.longitude,
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

  const onSubmit: SubmitHandler<CreateOrganizationSchemaType> = async (
    inputs,
  ) => {
    const result = await actionCreateMyOrganization(session!, { ...inputs })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      reset()
      toast.success(result)
      handleOpenDialog()
    }
  }

  return (
    <Fragment>
      <Tooltip title={'criar'} onClick={handleOpenDialog}>
        <Fab variant="circular" size="small" color="primary">
          <Add sx={{ m: 1 }} />
        </Fab>
      </Tooltip>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleOpenDialog}
        maxWidth={'xs'}
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: colors.blue[400],
            textTransform: 'lowercase',
          }}
        >
          {'dedicado'}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ my: 2 }}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              {...register('name')}
              margin="normal"
              size="small"
              fullWidth
              label="nome da organização"
            />
            {errors.name && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.name.message}
              </FormHelperText>
            )}

            <TextField
              {...register('document')}
              margin="normal"
              size="small"
              fullWidth
              label="documento"
              type="number"
            />
            {errors.document && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.document.message}
              </FormHelperText>
            )}

            <TextField
              {...register('email')}
              margin="normal"
              size="small"
              fullWidth
              label="email"
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
              fullWidth
              label="telefone"
            />
            {errors.phone && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.phone.message}
              </FormHelperText>
            )}

            <TextField
              {...register('zipCode')}
              margin="normal"
              size="small"
              fullWidth
              label="cep"
              onBlur={loadZipCode}
            />
            {errors.zipCode && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.zipCode.message}
              </FormHelperText>
            )}

            <TextField
              {...register('street')}
              margin="normal"
              size="small"
              fullWidth
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

            <TextField
              {...register('complement')}
              margin="normal"
              size="small"
              fullWidth
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

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              criar minha organização
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
