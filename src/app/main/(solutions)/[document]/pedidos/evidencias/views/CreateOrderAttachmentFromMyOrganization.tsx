'use client'

import {
  CreateOrderAttachmentSchema,
  CreateOrderAttachmentSchemaType,
} from '@/app/main/(management)/orders/attachments/schema'
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
import { useState, useCallback, Fragment } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  authorizationKey: string
  orderCode?: string
}

export default function CreateOrderAttachmentFromMyOrganization(props: Props) {
  const { authorizationKey } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateOrderAttachmentSchemaType>({
    resolver: zodResolver(CreateOrderAttachmentSchema),
  })
  const onSubmit: SubmitHandler<CreateOrderAttachmentSchemaType> = async (
    inputs,
  ) => {
    console.log({ ...inputs }, authorizationKey)
    reset()
    handleOpenDialog()
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
            sx={{ my: 2, width: '100%' }}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              {...register('orderCode')}
              margin="normal"
              size="small"
              fullWidth
              label="código do pedido"
            />
            {errors.orderCode && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.orderCode.message}
              </FormHelperText>
            )}

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

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              adicionar evidência ao pedido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
