'use client'

import TiptapEditorContent from '@/components/tiptap'
import { Button } from '@material-tailwind/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function PostEditor() {
  const { control, handleSubmit, register } = useForm<any>({
    defaultValues: { content: '...' },
  })

  const onSubmit: SubmitHandler<any> = async (inputs: { content?: string }) => {
    alert(inputs.content)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2 sm:min-w-[400px]"
    >
      <div className="bg-gray-50 border border-spacing-2 rounded-md shadow-md">
        <Controller
          {...register('content')}
          control={control}
          render={({ field: { value, onChange } }) => (
            <input className='w-full border-none' value={value} onChange={onChange} />
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
