'use client'

import {
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/app/main/(management)/organizations/users/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormHelperText, MenuItem, Select } from '@mui/material'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateMyOrganizationUser } from '../actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'

interface Props {
  userData: OrganizationUsersType
  onClose: () => void
}

export default function UpdateMyOrganizationUserFormView(props: Props) {
  const { userData, onClose } = props
  const { data: session } = useSession()
  const [role, setRole] = useState(userData?.role)

  const params = useParams()
  const { document }: any = params
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateOrganizationUserSchemaType>({
    resolver: zodResolver(UpdateOrganizationUserSchema),
    defaultValues: {
      active: userData?.active,
      role: userData?.role,
    },
  })
  const onSubmit: SubmitHandler<UpdateOrganizationUserSchemaType> = async (
    inputs,
  ) => {
    const result = await actionUpdateMyOrganizationUser(
      session!,
      inputs,
      userData?.id,
      document,
    )
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

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar usuário nesta organização
      </Button>
    </Box>
  )
}
