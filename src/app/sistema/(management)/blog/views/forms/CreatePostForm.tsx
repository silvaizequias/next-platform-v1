import { CreatePostDTO, CreatePostDTOType } from '@/app/api/posts/dto'
import useFetch from '@/hooks/use-fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreatePostForm() {
  const { data: posts, mutate } = useFetch<[] | any>('/api/blog/posts')

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
      <button className="w-full uppercase" type="submit">
        Criar Postagem
      </button>
    </form>
  )
}
