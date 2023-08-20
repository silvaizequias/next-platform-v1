import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileProps } from '../types'

export default function ProfileUpdateForm(props: ProfileProps) {
  const { profile } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileUpdateSchemaType>({
    mode: 'all',
    resolver: yupResolver(ProfileUpdateSchema),
  })

  const onSubmit: SubmitHandler<ProfileUpdateSchemaType> = async (inputs) => {
    await axios
      .patch(`/api/profile/${profile?.id}`, inputs)
      .then(async (res) => {})
      .catch((error: any) => {
        return new Error(error?.message || error)
      })
  }

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    ></form>
  )
}
