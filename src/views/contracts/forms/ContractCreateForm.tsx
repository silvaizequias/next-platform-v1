import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/schemas/contract'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContractCreateFormProps } from '../types'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import { ServiceType } from '@/views/services/types'
import { UserType } from '@/views/users/types'

export default function ContractCreateForm(props: ContractCreateFormProps) {
  const { onClose } = props
  const { data: users } = useFetch('/api/users')
  const { data: services } = useFetch('/api/services')
  const { data, mutate } = useFetch('/api/contracts')

  const [user, setUser] = useState<string>()
  const [service, setService] = useState<string>()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContractCreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ContractCreateSchema),
  })

  const onSubmit: SubmitHandler<ContractCreateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/contracts`, inputs)
        .then(async (res: any) => {
          onClose()
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
        })
        .catch((error: any) => {
          new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id='serviceCode'>Serviço</InputLabel>
        <Select
          {...register('serviceCode')}
          required
          autoFocus
          label={'Serviço'}
          value={service}
          onChange={(e) => setService(e?.target?.value)}
          error={Boolean(errors.serviceCode)}
          inputProps={{ placeholder: 'Serviço' }}
        >
          {/* //TODOS: criar condiçao para filtrar os serviços */}
          <MenuItem value=''></MenuItem>
          {services?.map((service: ServiceType) => (
            <MenuItem key={service?.id} value={service?.serviceCode}>
              {service?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id='period'>Período</InputLabel>
        <Select
          {...register('period')}
          required
          autoFocus
          label={'Período'}
          value={service}
          onChange={(e) => setService(e?.target?.value)}
          error={Boolean(errors.period)}
          inputProps={{ placeholder: 'Período' }}
        >
          {/* //TODOS: criar condiçao para filtrar os serviços */}
          <MenuItem value='MONTHLY'>Mensal</MenuItem>
          <MenuItem value='QUARTERLY'>Trimestral</MenuItem>
          <MenuItem value='SEMESTERLY'>Semestral</MenuItem>
          <MenuItem value='YEARLY'>Anual</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id='userPhone'>Usuário</InputLabel>
        <Select
          {...register('userPhone')}
          required
          autoFocus
          label={'Usuário'}
          value={service}
          onChange={(e) => setService(e?.target?.value)}
          error={Boolean(errors.userPhone)}
          inputProps={{ placeholder: 'Usuário' }}
        >
          {/* //TODOS: criar condiçao para filtrar os usuários */}
          <MenuItem value=''></MenuItem>
          {users?.map((user: UserType) => (
            <MenuItem key={user?.id} value={user?.phone}>
              {user?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='success'
        sx={{ mb: 4 }}
      >
        Criar Contrato
      </Button>
    </form>
  )
}
