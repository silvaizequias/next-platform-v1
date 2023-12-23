'use client'

import { PostUpdateDTO, PostUpdateDTOType } from '@/app/api/posts/dto'
import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  id: string
}

export default function PostUpdateForm(props: Props) {
  const { data: posts, mutate } = useFetch<PostType[] | any>('/api/posts')
  const { data: post } = useFetch<PostType | any>(`/api/posts/${props?.id}`)

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PostUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(PostUpdateDTO),
  })

  const onSubmit: SubmitHandler<PostUpdateDTOType> = async (inputs) => {
    try {
      await fetch(`/api/posts/${props?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...posts, data, {
            revalidate: true,
            rollbackOnError: true,
          })

          reset(inputs)
          toast.success(data)
        } else {
          toast.error(data)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset(inputs)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('title')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="title"
            type="text"
            value={value}
            defaultValue={post?.title}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.title?.message}
        </span>
      )}

      <Controller
        {...register('subject')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="subject"
            type="text"
            value={value}
            defaultValue={post?.subject}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.subject?.message}
        </span>
      )}

      <Controller
        {...register('content')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <textarea
            className="rounded-md"
            name="content"
            cols={5}
            rows={5}
            value={value}
            defaultValue={post?.content}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.content?.message}
        </span>
      )}

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Atualizar Postagem
      </Button>
    </form>
  )
}
