'use client'

import {
  CreateOrganizationUserSchema,
  CreateOrganizationUserSchemaType,
} from '@/app/main/(management)/organizations/users/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionCreateMyOrganizationUser } from '../actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function CreateMyOrganizationUserFormView({
  onClose,
}: {
  onClose: () => void
}) {
  const { data: session } = useSession()
  const [role, setRole] = useState<string>(
    'client' || 'assistant' || 'technician' || 'administrator' || 'owner',
  )

  const params = useParams()
  const { document }: any = params
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateOrganizationUserSchemaType>({
    resolver: zodResolver(CreateOrganizationUserSchema),
    defaultValues: {
      organizationDocument: document!,
    },
  })
  const onSubmit: SubmitHandler<CreateOrganizationUserSchemaType> = async (
    inputs,
  ) => {
    const result = await actionCreateMyOrganizationUser(session!, { ...inputs })
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      onClose()
    }
  }

  return (
    <Box
      sx={{ my: 2, width: '100%' }}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Select
        {...register('role')}
        margin="none"
        size="small"
        fullWidth
        label="função"
        value={role}
        onChange={(e: any) => setRole(e.target?.value)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="client">cliente</MenuItem>
        <MenuItem value="assistant">assistente</MenuItem>
        <MenuItem value="technician">técnico</MenuItem>
        <MenuItem value="administrator">administrador</MenuItem>
        <MenuItem value="owner">proprietário</MenuItem>
      </Select>
      {errors.role && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.role.message}
        </FormHelperText>
      )}

      <TextField
        {...register('userPhone')}
        margin="normal"
        size="small"
        fullWidth
        label="telefone"
        type='number'
      />
      {errors.userPhone && (
        <FormHelperText
          sx={{ color: 'error.main', textTransform: 'lowercase' }}
        >
          {errors.userPhone.message}
        </FormHelperText>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        adicionar usuário nesta organização
      </Button>
    </Box>
  )
}
