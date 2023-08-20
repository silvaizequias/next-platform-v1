import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthResetPasswordType>({
    mode: 'onChange',
    resolver: yupResolver(AuthResetPassword),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordType> = async (inputs) => {
    try {
      await axios
        .post(`/api/signup`, inputs)
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
