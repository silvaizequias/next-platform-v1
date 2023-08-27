import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/schemas/contract'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl } from '@mui/material'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function ContractCreateForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
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
        .then((res: any) => {})
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
      <FormControl fullWidth sx={{ mb: 4 }}></FormControl>
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
