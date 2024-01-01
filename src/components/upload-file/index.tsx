'use client'

import { Button, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { uploadFileAction } from './actions'

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder!)

      await uploadFileAction(formData)
        .then((res: any) => {
          toast.success('o arquivo foi salvo')
        })
        .catch((error: any) => toast.error(error))

      router.refresh()
    } catch (error: any) {
      setUploading(false)
      console.error(error?.message || error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
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
