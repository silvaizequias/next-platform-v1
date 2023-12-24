'use client'

import { CreatePostDTO, CreatePostDTOType } from '@/app/api/posts/dto'
import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input, Textarea } from '@material-tailwind/react'
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
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'título'}
            name="title"
            type="text"
            value={value}
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
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'assunto'}
            name="subject"
            type="text"
            value={value}
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
        {...register('resume')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Textarea
            color="green"
            label={'resumo'}
            name="resume"
            rows={2}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.content?.message}
        </span>
      )}

      <Controller
        {...register('video')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            crossOrigin={undefined}
            color="green"
            size="md"
            label={'url de video'}
            name="video"
            type="text"
            value={value}
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
          <Textarea
            color="green"
            label={'conteúdo'}
            name="content"
            rows={10}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.content?.message}
        </span>
      )}

      <div className='flex flex-1 items-center gap-2'>
        <Controller
          {...register('private')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              crossOrigin={undefined}
              color="green"
              label={'conteúdo privado'}
              defaultChecked={false}
              name="private"
              type="boolean"
              onChange={onChange}
            />
          )}
        />

        <Controller
          {...register('draft')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              crossOrigin={undefined}
              color="green"
              label={'rascunho'}
              defaultChecked={false}
              name="draft"
              type="boolean"
              onChange={onChange}
            />
          )}
        />

        <Controller
          {...register('spotlight')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              crossOrigin={undefined}
              color="green"
              label={'destaque'}
              defaultChecked={false}
              name="spotlight"
              type="boolean"
              onChange={onChange}
            />
          )}
        />
      </div>

      <Button
        variant="gradient"
        color="green"
        size="sm"
        fullWidth
        type="submit"
      >
        Criar Postagem
      </Button>
    </form>
  )
}
