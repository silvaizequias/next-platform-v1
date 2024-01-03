'use client'

import { Button } from '@material-tailwind/react'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { uploadFileS3 } from '@/services/aws/s3'
import MediaPreview from '@/components/media-preview'

export default function UploadScreen() {
  const [changeFile, setChangeFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [changed, setChanged] = useState<boolean>(false)
  const [fileType, setFileType] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file: File | null = (e.target.files?.[0] as File) ?? null
      const size = file?.size
      const type = file?.type.split('/')[0]
      const url = URL?.createObjectURL(file)
      if (!file) {
        setChangeFile(null)
        setPreviewUrl(null)
        setChanged(false)
        setFileType(null)
      }
      if (size && size > 1024 * 1024 * 10) {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }
        toast.error(`o arquivo é maior que 10Mb`)
        setChangeFile(null)
        setPreviewUrl(null)
        setChanged(false)
        setFileType(null)
      } else {
        setChangeFile(file)
        setPreviewUrl(url!)
        setChanged(true)
        setFileType(type!)
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    },
    [previewUrl],
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const path = 'temp'
      const data = new FormData()
      changeFile && data.append('file', changeFile)

      await uploadFileS3({ data: data, path: path })
        .then((res: any) => {
          console.log(res.url)
          toast.success(res.message)
        })
        .catch((error: any) => {
          toast.error(error)
        })
    } catch (error: any) {
      toast.error(error?.message || 'ocorreu um erro inesperado')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 justify-center max-w-lg mx-auto"
    >
      {previewUrl && <MediaPreview src={previewUrl!} media={fileType!} />}
      <input
        id="file"
        type="file"
        className="text-xs italic py-2"
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="gradient"
        color="light-green"
        hidden={!changed}
        disabled={loading}
      >
        {loading ? 'enviando o arquivo...' : 'carregar o arquivo'}
      </Button>
    </form>
  )
}
