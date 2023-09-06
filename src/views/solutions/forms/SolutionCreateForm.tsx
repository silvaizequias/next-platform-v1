import { useFetch } from '@/hooks/useFetch'
import { SolutionCreateFormProps } from '../types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  SolutionCreateSchema,
  SolutionCreateSchemaType,
} from '@/schemas/solution'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'

export default function SolutionCreateForm(props: SolutionCreateFormProps) {
  const { onClose } = props

  const { data, mutate } = useFetch('/api/solutions')

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SolutionCreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(SolutionCreateSchema),
  })

  const onSubmit: SubmitHandler<SolutionCreateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/solutions`, inputs)
        .then(async (res: any) => {
          onClose()
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(`A solução ${res.data?.name!} foi criada!`)
        })
        .catch((error: any) => {
          toast.error(error?.message)
          console.error(error)
        })
    } catch (error: any) {
      console.error(error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ my: 2 }}>
        <Controller
          {...register('name')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Nome da Solução'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.name)}
              placeholder='Nome da Solução'
            />
          )}
        />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('url')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'URL da Solução'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.url)}
              placeholder='URL da Solução'
            />
          )}
        />
        {errors.url && <FormHelperText>{errors.url.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('cloud')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Servidor'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.cloud)}
              placeholder='Servidor'
            />
          )}
        />
        {errors.cloud && (
          <FormHelperText>{errors.cloud.message}</FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='success'
        sx={{ mb: 4 }}
      >
        Criar Solução
      </Button>
    </form>
  )
}
