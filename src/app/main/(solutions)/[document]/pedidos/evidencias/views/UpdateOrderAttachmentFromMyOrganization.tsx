'use client'

import {
  UpdateOrderAttachmentSchema,
  UpdateOrderAttachmentSchemaType,
} from '@/app/main/(management)/orders/attachments/schema'
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'
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
  attachment: OrderAttachmentType
  authorizationKey: string
}

export default function UpdateOrderAttachmentFromMyOrganization(props: Props) {
  const { attachment, authorizationKey } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UpdateOrderAttachmentSchemaType>({
    resolver: zodResolver(UpdateOrderAttachmentSchema),
    defaultValues: {
      note: attachment?.note,
      file: attachment?.file,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrderAttachmentSchemaType> = async (
    inputs,
  ) => {
    console.log(authorizationKey, { ...inputs }, attachment?.id)
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
              atualizar evidência ao pedido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
