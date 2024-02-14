'use client'

import {
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/app/main/(management)/organizations/users/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Tooltip,
  colors,
} from '@mui/material'
import { useParams } from 'next/navigation'
import { ChangeEvent, Fragment, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { actionUpdateMyOrganizationUser } from '../actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'
import { Edit } from '@mui/icons-material'

interface Props {
  userData: OrganizationUsersType
}

export default function UpdateMyOrganizationUserFormView(props: Props) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const { userData } = props
  const { data: session } = useSession()

  const [role, setRole] = useState(userData?.role)
  const handleRole = (e: any) => {
    setRole(e.target?.value)
  }

  const [active, setActive] = useState(userData?.active)
  const handleActive = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked)
  }

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
      handleOpenDialog()
    }
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
          {`atualizar ${userData?.user?.name.split(' ')[0]}`}
        </DialogTitle>
        <DialogContent>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControlLabel
              sx={{
                mr: 1,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}
              label={'função na organização'}
              labelPlacement="start"
              control={
                <Select
                  {...register('role')}
                  margin="none"
                  size="small"
                  value={role}
                  onChange={handleRole}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="client">cliente</MenuItem>
                  <MenuItem value="assistant">assistente</MenuItem>
                  <MenuItem value="technician">técnico</MenuItem>
                  <MenuItem value="administrator">administrador</MenuItem>
                  <MenuItem value="owner">proprietário</MenuItem>
                </Select>
              }
            />
            {errors.role && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.role.message}
              </FormHelperText>
            )}

            <FormControlLabel
              sx={{
                mr: 1,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}
              label={
                userData?.active
                  ? `desabilitar ${
                      userData?.user?.name.split(' ')[0]
                    } na organização`
                  : `habilitar ${
                      userData?.user?.name.split(' ')[0]
                    } na organização`
              }
              labelPlacement="start"
              control={<Checkbox checked={active} onChange={handleActive} />}
            />
            {errors.active && (
              <FormHelperText
                sx={{ color: 'error.main', textTransform: 'lowercase' }}
              >
                {errors.active.message}
              </FormHelperText>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              atualizar usuário nesta organização
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
