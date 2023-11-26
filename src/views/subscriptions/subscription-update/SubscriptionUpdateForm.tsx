'use client'

import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateDTOType,
} from '@/dto/subscription.dto'
import { SubscriptionType } from '@/types/subscription'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  subscription: SubscriptionType
  subscriptions: SubscriptionType[]
  mutate: KeyedMutator<[]>
}

export default function SubscriptionUpdateForm(props: Props) {
  const { subscription, subscriptions, mutate } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SubscriptionUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(SubscriptionUpdateDTO),
  })

  const onSubmit: SubmitHandler<SubscriptionUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res?.status !== 201) toast.error(await res?.json())

        await mutate(...(subscriptions && (await res?.json())), {
          revalidate: true,
          rollbackOnError: true,
        })

        toast.success(await res?.json())
      })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
      console.error(error)
    } finally {
      reset
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
