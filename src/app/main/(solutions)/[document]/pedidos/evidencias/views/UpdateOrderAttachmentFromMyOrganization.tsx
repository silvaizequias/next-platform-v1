'use client'

import {
  UpdateOrderAttachmentSchema,
  UpdateOrderAttachmentSchemaType,
} from '@/app/main/(management)/orders/attachments/schema'
import { OrderAttachmentType } from '@/app/main/(management)/orders/attachments/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  attachment: OrderAttachmentType
  authorizationKey: string
  onClose: () => void
}

export default function UpdateOrderAttachmentFromMyOrganization(props: Props) {
  const { attachment, authorizationKey, onClose } = props

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
    onClose()
  }

  return (
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
  )
}
