'use client'

import {
  UpdateOrderSchema,
  UpdateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { OrderType } from '@/app/main/(management)/orders/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from '@mui/icons-material'
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
import { Fragment, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateMyOrganziationOrder } from '../actions'
import toast from 'react-hot-toast'

interface Props {
  authorizationKey: string
  order: OrderType
}

export default function UpdateOrderFromMyOrganization(props: Props) {
  const { authorizationKey, order } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UpdateOrderSchemaType>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      observation: order?.observation,
      member: order?.member,
      deadline: order?.deadline,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderSchemaType> = async (inputs) => {
    const result = await actionUpdateMyOrganziationOrder(
      authorizationKey,
      { ...inputs },
      order?.id,
    )
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
      <Tooltip title={'atualizar'} onClick={handleOpenDialog}>
        <Fab variant="circular" size="small" color="primary">
          <Edit sx={{ m: 1 }} />
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
          {`atualizar pedido ${order?.code}`}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ paddingY: 2 }}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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

            <TextField
              {...register('deadline')}
              margin="normal"
              size="small"
              fullWidth
              label="prazo final"
              type="date"
            />
            {errors.deadline && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.deadline.message}
              </FormHelperText>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              atualizar pedido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
