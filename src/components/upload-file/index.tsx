'use client'

import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  folder?: string
}

export default function UploadFile(props: Props) {
  const { folder } = props
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const handleFileChange = useCallback((e: any) => {
    const size = e.target.files[0].size
    if (size && size > 10000000) {
      toast.error('o tamanho do arquivo é maior que 10M')
    } else {
      setFile(e.target.files[0])
    }
  }, [])

  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'all',
    resetOptions: { keepIsSubmitSuccessful: true },
  })

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      if (!file) return
      setUploading(true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder!)

      await fetch(`/api/aws/s3`, {
        method: 'POST',
        body: formData,
      })
        .then(async (res: any) => {
          console.log(await res.text())
          if (res.status == 201) return toast.success('o arquivo foi salvo')
        })
        .catch((error: any) => {
          toast.error(error?.message)
        })

      router.refresh()
    } catch (error: any) {
      setUploading(false)
      console.error(error?.message || error)
    } finally {
      setUploading(false)
      reset()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 m-2 w-full max-w-md"
    >
      <Input
        className="flex justify-center items-center"
        crossOrigin={undefined}
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <Button
        disabled={!file || uploading}
        variant="gradient"
        color="green"
        size="sm"
        fullWidth
        type="submit"
      >
        {uploading ? 'Salvando Arquivo...' : 'Salvar Arquivo'}
      </Button>
    </form>
  )
}
