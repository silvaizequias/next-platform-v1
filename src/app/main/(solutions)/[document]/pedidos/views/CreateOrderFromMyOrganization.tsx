'use client'

import {
  CreateOrderSchema,
  CreateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add } from '@mui/icons-material'
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
import { useParams } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionCreaeteMyOrganziationOrder } from '../actions'
import toast from 'react-hot-toast'

interface Props {
  authorizationKey: string
}

export default function CreateOrderFromMyOrganization(props: Props) {
  const { authorizationKey } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const params = useParams()
  const { document }: any = params

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateOrderSchemaType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      organization: document,
    },
  })
  const onSubmit: SubmitHandler<CreateOrderSchemaType> = async (inputs) => {
    const result = await actionCreaeteMyOrganziationOrder(authorizationKey, {
      ...inputs,
    })
    if (result?.response?.error || result?.error) {
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
          <Box sx={{ paddingY: 2 }} component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('customer')}
              margin="normal"
              size="small"
              fullWidth
              label="cliente"
              type="number"
            />
            {errors.customer && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.customer.message}
              </FormHelperText>
            )}

            <TextField
              {...register('observation')}
              margin="normal"
              multiline
              maxRows={4}
              fullWidth
              label="observação"
            />
            {errors.observation && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.observation.message}
              </FormHelperText>
            )}

            <TextField
              {...register('deadline')}
              margin="normal"
              size="small"
              fullWidth
              label="prazo final"
              type="datetime-local"
            />
            {errors.deadline && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.deadline.message}
              </FormHelperText>
            )}

            <TextField
              {...register('member')}
              margin="normal"
              size="small"
              fullWidth
              label="membro responsável"
              type="number"
            />
            {errors.member && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.member.message}
              </FormHelperText>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              registrar pedido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
