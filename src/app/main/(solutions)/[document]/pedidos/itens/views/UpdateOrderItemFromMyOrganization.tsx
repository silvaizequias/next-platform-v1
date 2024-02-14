'use client'

import {
  UpdateOrderItemSchema,
  UpdateOrderItemSchemaType,
} from '@/app/main/(management)/orders/items/schema'
import { OrderItemType } from '@/app/main/(management)/orders/items/types'
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
import { useState, useCallback, Fragment } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  item: OrderItemType
}

export default function UpdateOrderItemFromMyOrganization(props: Props) {
  const { authorizationKey, item } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UpdateOrderItemSchemaType>({
    resolver: zodResolver(UpdateOrderItemSchema),
    defaultValues: {
      note: item?.note,
      amount: item?.amount,
      file: item?.file,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderItemSchemaType> = async (inputs) => {
    console.log(authorizationKey, { ...inputs }, item?.id)
    reset()
    handleOpenDialog()
  }

  return (
    <Fragment>
      <Tooltip title={'editar'} onClick={handleOpenDialog}>
        <Fab variant="circular" size="small" color="primary">
          <Edit sx={{ m: 1 }} />
        </Fab>
      </Tooltip>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleOpenDialog}
        maxWidth={'xs'}
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
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('note')}
              margin="normal"
              size="small"
              fullWidth
              label="observação"
            />
            {errors.note && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.note.message}
              </FormHelperText>
            )}

            <TextField
              {...register('amount')}
              margin="normal"
              size="small"
              fullWidth
              label="quantidade"
              type="number"
            />
            {errors.amount && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.amount.message}
              </FormHelperText>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              atualizar item ao pedido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
