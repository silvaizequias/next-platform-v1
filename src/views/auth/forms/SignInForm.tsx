import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function SignInForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSignInSchemaType>({
    mode: 'all',
    resolver: yupResolver(AuthSignInSchema),
  })

  const onSubmit: SubmitHandler<AuthSignInSchemaType> = async (inputs, e) => {
    e?.preventDefault()
    try {
      await axios
        .post(`/api/signin`, inputs)
        .then((res) => {})
        .catch((error: any) => {
          return new Error(error?.message || error)
        })
    } catch (error: any) {
      console.error(error?.message || error)
      return new Error(error?.message || error)
    }
  }

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    ></form>
  )
}
