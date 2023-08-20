import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function ProfileUpdateForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileUpdateSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(ProfileUpdateSchema),
  })

  const onSubmit: SubmitHandler<ProfileUpdateSchemaType> = async (inputs) => {
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
