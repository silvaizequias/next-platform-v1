import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileProps } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProfilePasswordUpdateSchema,
  ProfilePasswordUpdateSchemaType,
} from '@/schemas/profile'
import axios from 'axios'
import { Button, Grid } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function ProfilePasswordUpdateForm(props: ProfileProps) {
  const { profile } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ProfilePasswordUpdateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ProfilePasswordUpdateSchema),
  })

  const onSubmit: SubmitHandler<ProfilePasswordUpdateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .patch(`/api/profile/password-update/${profile?.id}`, inputs)
        .then(async (res) => {
          if (res.status == 200) await signOut()
        })
        .catch((error: any) => {
          console.error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          odPassword
        </Grid>
        <Grid item xs={12} sm={6}>
          newPassword
        </Grid>
        <Grid item xs={12} sm={6}>
          confirmNewPassord
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            color='warning'
            sx={{ mt: 4 }}
          >
            Atualizar Senha
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
