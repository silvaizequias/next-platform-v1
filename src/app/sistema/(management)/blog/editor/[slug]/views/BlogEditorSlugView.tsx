'use client'

import { Button, Checkbox, Input, Textarea } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from 'novel'
import { useCallback, useState } from 'react'
import { PostUpdateDTO, PostUpdateDTOType } from '@/app/api/posts/dto'
import { PostType } from '@/types/post'
import useFetch from '@/hooks/use-fetch'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
  post: PostType
}

export default function BlogEditoSlugView(props: Props) {
  const { post } = props
  const { data: posts, mutate } = useFetch<PostType[] | any>('/api/posts')

  const [content, setContent] = useState<string | any>(post?.content)

  const handleContent = useCallback((content: any) => {
    content && setContent(content)
  }, [])

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PostUpdateDTOType>({
    mode: 'all',
    resolver: zodResolver(PostUpdateDTO),
    //resetOptions: { keepIsSubmitSuccessful: true },
    defaultValues: {
      title: post?.title || undefined,
      subject: post?.subject || undefined,
      resume: post?.resume || undefined,
      image: post?.image || undefined,
      video: post?.video || undefined,
      content: content || undefined,
      draft: post?.draft,
      private: post?.private,
      spotlight: post?.spotlight,
    },
  })

  const onSubmit: SubmitHandler<PostUpdateDTOType> = async (inputs) => {
    try {
      const data: PostUpdateDTOType = {
        ...inputs,
        content: content,
      }

      await fetch(`/api/posts/${post?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        if (res.status == 201) {
          await mutate(posts, {
            revalidate: true,
            rollbackOnError: true,
          })
          toast.success(res.text())
          router.push('/blog')
        } else {
          toast.error(res.text())
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
      className="flex flex-col justify-center gap-4 m-2 w-full"
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
          {errors.resume?.message}
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
            label={'url do video'}
            name="video"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.video?.message}
        </span>
      )}

      <div className="relative flex w-full">
        <Controller
          {...register('image')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              crossOrigin={undefined}
              color="green"
              size="md"
              label={'url da imagem'}
              name="image"
              type="text"
              value={value}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
            />
          )}
        />
        <div className="bg-green-400 rounded-sm">
          <Button
            color="green"
            size="sm"
            className="!absolute right-1 top-1 rounded  text-green-600"
          >
            Carregar imagem
          </Button>
        </div>
      </div>
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.image?.message}
        </span>
      )}

      <div className="relative block">
        <Editor
          className="w-full"
          defaultValue={post?.content}
          onUpdate={(editor) => {
            handleContent(editor?.getHTML())
          }}
        />
      </div>

      <div className="flex flex-1 items-center gap-2">
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
      <div className="relative bg-green-400 rounded-md">
        <Button
          variant="gradient"
          color="green"
          size="sm"
          fullWidth
          type="submit"
        >
          Atualizar Postagem
        </Button>
      </div>
    </form>
  )
}
