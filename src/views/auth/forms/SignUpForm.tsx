import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignUpSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(AuthSignUpSchema),
  })

  const onSubmit: SubmitHandler<AuthSignUpSchemaType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/signup`, inputs)
        .then((res: any) => {
          alert(
            JSON.stringify(
              `Seja bem vindo ${res.data?.name}! Sua senha de acesso foi enviada para o e-mail ${res.data?.email}`,
            ),
          )
        })
        .catch((error: any) => {
          alert(JSON.stringify(error?.message || error))
          new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <>
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='Nome e Sobrenome'
            />
          )}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </>
      <>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </>
      <>
        <Controller
          name='phone'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              autoFocus
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='11 98765 4321'
            />
          )}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </>
      <button type='submit'>Registrar-se</button>
    </form>
  )
}
