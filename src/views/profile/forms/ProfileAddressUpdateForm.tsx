import { useFetch } from '@/hooks/useFetch'
import { UserType } from '@/types/user'
import {
  UserAddressUpdateSchema,
  UserAddressUpdateSchemaType,
} from '@/types/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProfileProps } from '../types'

export default function ProfileAddressUpdateForm(props: ProfileProps) {
  const { user } = props
  const userId = user?.id!
  const { data: users, mutate } = useFetch<UserType[] | any>(`/api/users`)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<UserAddressUpdateSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserAddressUpdateSchema),
  })

  const onSubmit: SubmitHandler<UserAddressUpdateSchemaType> = async (
    inputs,
  ) => {
    try {
      await axios
        .patch(`/api/users/address-update/${userId}`, inputs)
        .then(async (res: any) => {
          await mutate(...users!, res.data!, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(`${user?.name}, seu endereço foi atualizado!`)
        })
        .catch((error: any) => {
          toast.error(error?.message)
          console.error(error)
        })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    }
  }

  const setZipCode = async (event: { target: { value: any } }) => {
    const zipCode = event.target.value?.replace(/[^0-9]/g, '')
    try {
      if (zipCode) {
        await axios
          .get(`https://viacep.com.br/ws/${zipCode}/json/`)
          .then(async (res: any) => {
            if (!res.data?.cep!) {
              toast.error(`CEP ${zipCode} inválido!`)
            }
            setValue('street', res.data?.logradouro)
            setValue('complement', res.data?.complemento)
            setValue('district', res.data?.bairro)
            setValue('city', res.data?.localidade)
            setValue('state', res.data?.uf)
          })
          .catch((error: any) => {
            toast.error(error?.response?.data || error?.message)
          })
      }
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <Controller
              {...register('zipCode')}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={'CEP'}
                  type={'number'}
                  value={value}
                  defaultValue={user?.zipCode!}
                  onBlur={setZipCode}
                  onChange={onChange}
                  error={Boolean(errors.zipCode)}
                  placeholder={user?.zipCode!}
                  size={'small'}
                />
              )}
            />
            {errors.zipCode && (
              <FormHelperText>{errors.zipCode.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
            <Controller
              {...register('complement')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  label={'Complemento'}
                  value={value}
                  defaultValue={user?.complement!}
                  onChange={onChange}
                  error={Boolean(errors.complement)}
                  placeholder={
                    user?.complement! ||
                    'numero, apartamento, ponto de referência'
                  }
                  size={'small'}
                />
              )}
            />
            {errors.complement && (
              <FormHelperText>{errors.complement.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <Controller
              {...register('street')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={value}
                  defaultValue={user?.street!}
                  onChange={onChange}
                  placeholder={user?.street! || 'Logradouro'}
                  size={'small'}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('district')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={value}
                  defaultValue={user?.district!}
                  onChange={onChange}
                  placeholder={user?.district! || 'Bairro'}
                  size={'small'}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <Controller
              {...register('city')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={value}
                  defaultValue={user?.city!}
                  onChange={onChange}
                  placeholder={user?.city! || 'Cidade'}
                  size={'small'}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <FormControl fullWidth>
            <Controller
              {...register('state')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={value}
                  defaultValue={user?.state!}
                  onChange={onChange}
                  placeholder={user?.state! || 'Cidade'}
                  size={'small'}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            color='primary'
          >
            Atualizar Endereço
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
