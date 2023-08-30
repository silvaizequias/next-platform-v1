import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ProfileProps } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile'
import { useFetch } from '@/hooks/useFetch'
import axios from 'axios'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'

export default function ProfileAddressUpdateForm(props: ProfileProps) {
  const { profile } = props
  const { data, mutate } = useFetch(`/api/profile/${profile?.id}`)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileUpdateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ProfileUpdateSchema),
  })

  const onSubmit: SubmitHandler<ProfileUpdateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .patch(`/api/profile/${profile?.id}`, inputs)
        .then(async (res) => {
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('zipCode')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  label={'CEP'}
                  value={value}
                  defaultValue={profile?.zipCode!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.zipCode!)}
                  placeholder={profile?.zipCode!}
                />
              )}
            />
            {errors.zipCode && (
              <FormHelperText>{errors.zipCode.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              {...register('street')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  label={'Logradouro'}
                  value={value}
                  defaultValue={profile?.street!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.street!)}
                  placeholder={profile?.street!}
                />
              )}
            />
            {errors.street && (
              <FormHelperText>{errors.street.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <Controller
              {...register('number')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  label={'Número'}
                  value={value}
                  defaultValue={profile?.number!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.number!)}
                  placeholder={profile?.number!}
                />
              )}
            />
            {errors.number && (
              <FormHelperText>{errors.number.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={8}>
          <FormControl fullWidth>
            <Controller
              {...register('complement')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  autoFocus
                  label={'Complemento'}
                  value={value}
                  defaultValue={profile?.complement!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.complement!)}
                  placeholder={profile?.complement!}
                />
              )}
            />
            {errors.complement && (
              <FormHelperText>{errors.complement.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('zone')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={'Região'}
                  value={value}
                  defaultValue={profile?.zone!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.zone!)}
                  placeholder={profile?.zone!}
                />
              )}
            />
            {errors.zone && (
              <FormHelperText>{errors.zone.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('district')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={'Bairro'}
                  value={value}
                  defaultValue={profile?.district!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.district!)}
                  placeholder={profile?.district!}
                />
              )}
            />
            {errors.district && (
              <FormHelperText>{errors.district.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('city')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={'Cidade'}
                  value={value}
                  defaultValue={profile?.city!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.city!)}
                  placeholder={profile?.city!}
                />
              )}
            />
            {errors.city && (
              <FormHelperText>{errors.city.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('state')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={'Estado'}
                  value={value}
                  defaultValue={profile?.state!}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.state!)}
                  placeholder={profile?.state!}
                />
              )}
            />
            {errors.state && (
              <FormHelperText>{errors.state.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 4 }}
          >
            Atualizar Endereço
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
