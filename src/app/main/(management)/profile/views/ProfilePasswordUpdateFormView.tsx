'user client'

import { Box, Button, FormHelperText, Grid, TextField } from '@mui/material'
import { UserType } from '../../users/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ProfilePasswordUpdateSchema,
  ProfilePasswordUpdateSchemaType,
} from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from 'next-auth/react'
import { actionUpdateProfilePassword } from '../actions'
import toast from 'react-hot-toast'

interface Props {
  profile: UserType | any
}

export default function ProfilePasswordUpdateFormView(props: Props) {
  const { profile } = props
  const { data: session } = useSession()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfilePasswordUpdateSchemaType>({
    resolver: zodResolver(ProfilePasswordUpdateSchema),
  })
  const onSubmit: SubmitHandler<ProfilePasswordUpdateSchemaType> = async (
    inputs,
  ) => {
    const result = await actionUpdateProfilePassword(session!, inputs)
    if (result?.response?.error) {
      toast.error(result?.message)
    } else {
      toast.success(result)
      setTimeout(async () => {
        toast.success(
          `${profile?.name}, inicie a sessão novamente utilizando a nova senha que você definiu`,
        )
        await signOut()
      }, 5000)
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gap={1}
        sx={{ display: 'flex', justifyContent: 'center' }}
        container
        component={'div'}
      >
        <Grid item xs={12} sm={3.9}>
          <TextField
            {...register('oldPassword')}
            fullWidth
            margin="normal"
            size="small"
            required
            label="senha atual"
            type="password"
          />
          {errors.oldPassword && (
            <FormHelperText
              sx={{ color: 'error.main', textTransform: 'lowercase' }}
            >
              {errors.oldPassword.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            {...register('newPassword')}
            fullWidth
            margin="normal"
            size="small"
            required
            label="nova senha"
            type="password"
          />
          {errors.newPassword && (
            <FormHelperText
              sx={{ color: 'error.main', textTransform: 'lowercase' }}
            >
              {errors.newPassword.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={3.9}>
          <TextField
            {...register('confirmNewPassword')}
            fullWidth
            margin="normal"
            size="small"
            required
            label="confirmar nova senha"
            type="password"
          />
          {errors.confirmNewPassword && (
            <FormHelperText
              sx={{ color: 'error.main', textTransform: 'lowercase' }}
            >
              {errors.confirmNewPassword.message}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
        atualizar senha
      </Button>
    </Box>
  )
}
