import { docTypeList } from '@/helpers/document-type-list'
import { useFetch } from '@/hooks/useFetch'
import { UserType } from '@/types/user'
import {
  UserInformationUpdateSchema,
  UserInformationUpdateSchemaType,
} from '@/types/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { UserDocType } from '@prisma/client'
import axios from 'axios'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProfileProps } from '../types'

export default function ProfileInformationUpdateForm(props: ProfileProps) {
  const { user } = props
  const userId = user?.id!
  const { data: users, mutate } = useFetch<UserType[] | any>(`/api/users`)
  const [docType, setDocType] = useState<UserDocType | string>(user?.docType)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserInformationUpdateSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserInformationUpdateSchema),
  })

  const onSubmit: SubmitHandler<UserInformationUpdateSchemaType> = async (
    inputs,
  ) => {
    try {
      await axios
        .patch(`/api/users/${userId}`, inputs)
        .then(async (res: any) => {
          await mutate(...users!, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(`${user?.name}, suas informações foram atualizadas!`)
        })
        .catch((error: any) => {
          toast.error(error?.response?.data || error?.message)
        })
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <Controller
              {...register('name')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Nome Completo'}
                  type={'text'}
                  value={value}
                  defaultValue={user?.name!}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                  placeholder={user?.name!}
                  size={'small'}
                />
              )}
            />
            {errors.name && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('email')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'E-mail'}
                  type={'email'}
                  value={value}
                  defaultValue={user?.email!}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder={user?.email!}
                  size={'small'}
                />
              )}
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <Controller
              {...register('phone')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Celular'}
                  type={'number'}
                  value={value}
                  defaultValue={user?.phone!}
                  onChange={onChange}
                  error={Boolean(errors.phone)}
                  placeholder={user?.phone!}
                  size={'small'}
                />
              )}
            />
            {errors.phone && (
              <FormHelperText>{errors.phone.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <Select
              {...register('docType')}
              value={docType}
              defaultValue={user?.docType}
              onChange={(e) => {
                setDocType(e.target.value)
              }}
              inputProps={{ placeholder: 'Tipo de Documento' }}
              size={'small'}
            >
              {docTypeList?.map((name: any) => (
                <MenuItem
                  key={name?.document!}
                  value={name?.document!}
                  defaultValue={user?.docType}
                >
                  {name?.document!}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
            <Controller
              {...register('docCode')}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={'Documento'}
                  type={'text'}
                  value={value}
                  defaultValue={user?.docCode!}
                  onChange={onChange}
                  error={Boolean(errors.docCode)}
                  placeholder={user?.docCode!}
                  size={'small'}
                />
              )}
            />
            {errors.docCode && (
              <FormHelperText>{errors.docCode.message}</FormHelperText>
            )}
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
            Atualizar Informações
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
