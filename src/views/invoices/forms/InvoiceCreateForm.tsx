import { InvoiceCreateSchema, InvoiceCreateSchemaType } from '@/schemas/invoice'
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { InvoiceCreateFormProps } from '../types'
import { useFetch } from '@/hooks/useFetch'
import { Fragment, useState } from 'react'
import { ContractType } from '@/views/contracts/types'

export default function InvoiceCreateForm(props: InvoiceCreateFormProps) {
  const { onClose } = props
  const [contract, setContract] = useState<string>()
  const { data, mutate } = useFetch('/api/invoices')
  const { data: contracts } = useFetch('/api/contracts')

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<InvoiceCreateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(InvoiceCreateSchema),
  })

  const onSubmit: SubmitHandler<InvoiceCreateSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`/api/invoices`, inputs)
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
      <input
        {...register('invoiceCode')}
        hidden
        value={Math.random().toString(32).substr(2, 8).toUpperCase()}
      />
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id='contractCode'>Contrato</InputLabel>
        <Select
          {...register('contractCode')}
          required
          autoFocus
          label={'Contrato'}
          value={contract}
          onChange={(e) => setContract(e?.target?.value)}
          error={Boolean(errors.contractCode)}
          inputProps={{ placeholder: 'Contrato' }}
        >
          {/** //TODO: inserir condição para lista de contratos */}
          <MenuItem value=''></MenuItem>
          {contracts?.map((contract: ContractType) => (
            <MenuItem key={contract?.id} value={contract?.contractCode}>
              {contract?.contractCode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('amount', { valueAsNumber: true })}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Valor da Fatura'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.amount)}
              placeholder='Valor'
            />
          )}
        />
        {errors.amount && (
          <FormHelperText>{errors.amount.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('payUpTo', { valueAsDate: true })}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Pagar até'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.payUpTo)}
              placeholder='Valor'
            />
          )}
        />
        {errors.payUpTo && (
          <FormHelperText>{errors.payUpTo.message}</FormHelperText>
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
        Criar Fatura
      </Button>
    </form>
  )
}
