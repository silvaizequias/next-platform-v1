'use client'

import { CreatePostDTO, CreatePostDTOType } from '@/app/api/posts/dto'
import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreatePostForm() {
  const { data: posts, mutate } = useFetch<PostType[] | any>('/api/posts')

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreatePostDTOType>({
    mode: 'all',
    resolver: zodResolver(CreatePostDTO),
  })

  const onSubmit: SubmitHandler<CreatePostDTOType> = async (inputs) => {
    try {
      await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          await mutate(...posts, data, {
            revalidate: true,
            rollbackOnError: true,
          })
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
      className="flex flex-col flex-1 gap-4 m-2 sm:min-w-[400px]"
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
            onChange={onChange}
            placeholder="título da postagem"
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
            onChange={onChange}
            placeholder="assunto da postagem"
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
            rows={10}
            value={value}
            onChange={onChange}
            placeholder="conteúdo da postagem"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.content?.message}
        </span>
      )}

      <Button variant="gradient" color="blue" size="sm" fullWidth type="submit">
        Criar Postagem
      </Button>
    </form>
  )
}
