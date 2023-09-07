import { ServiceCreateSchema, ServiceCreateSchemaType } from '@/schemas/service'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ServiceCreateFormProps } from '../types'
import { useFetch } from '@/hooks/useFetch'
import { SolutionType } from '@/views/solutions/types'
import toast from 'react-hot-toast'

export default function ServiceCreateForm(props: ServiceCreateFormProps) {
  const { onClose } = props
  const [solution, setSolution] = useState<string>()
  const { data, mutate } = useFetch('/api/services')
  const { data: solutions } = useFetch('/api/solutions')

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ServiceCreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ServiceCreateSchema),
  })

  const onSubmit: SubmitHandler<ServiceCreateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/services`, inputs)
        .then(async (res: any) => {
          onClose()
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(`O serviço ${res.data?.name!} foi criado!`)
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
        <InputLabel id='solution'>Solução</InputLabel>
        <Select
          {...register('solutionId')}
          required
          autoFocus
          label={'Solução'}
          value={solution}
          onChange={(e) => setSolution(e?.target?.value)}
          error={Boolean(errors.solutionId)}
          inputProps={{ placeholder: 'Função' }}
        >
          <MenuItem value=''></MenuItem>
          {solutions?.map(
            (solution: SolutionType) =>
              solution?.isActive! == true && (
                <MenuItem key={solution?.id!} value={solution?.id!}>
                  {solution?.name!}
                </MenuItem>
              ),
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('name')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Nome do Serviço'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.name)}
              placeholder='Nome do Serviço'
            />
          )}
        />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('description')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Breve Descrição'}
              multiline
              rows={4}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.description)}
              placeholder='Descrição do Serviço'
            />
          )}
        />
        {errors.description && (
          <FormHelperText>{errors.description.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('price', { valueAsNumber: true })}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Valor do Serviço'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.price)}
              placeholder='Valor'
            />
          )}
        />
        {errors.price && (
          <FormHelperText>{errors.price.message}</FormHelperText>
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
        Criar Serviço
      </Button>
    </form>
  )
}
