'use client'

import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from 'novel'
import { useCallback, useState } from 'react'
import { CreatePostDTO, CreatePostDTOType } from '@/app/api/posts/dto'
import { PostType } from '@/types/post'
import useFetch from '@/hooks/use-fetch'
import toast from 'react-hot-toast'

export default function PostEditor() {
  const { data: posts, mutate } = useFetch<PostType[] | any>('/api/posts')

  const [content, setContent] = useState<string | undefined>('')

  const handleContent = useCallback((content: any) => {
    content && setContent(content)
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreatePostDTOType>({
    mode: 'all',
    resolver: zodResolver(CreatePostDTO),
    defaultValues: {
      content: content,
      title: 'Conteúdo para teste',
      subject: 'Isso é apenas um conteúdo de teste',
    },
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
      <div className="relative block">
        <Editor
          defaultValue={content}
          onUpdate={(editor) => {
            handleContent(editor?.getHTML())
          }}
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
          Criar Postagem
        </Button>
      </div>
    </form>
  )
}
