'use client'

import MediaPreview from '@/components/media-preview'
import { Button } from '@material-tailwind/react'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { profileAvatarUpdateAction } from '../actions'
import { Session } from 'next-auth'

interface Props {
  image: string
  onClose: () => void
  session: Session
}

export default function ProfileAvatarUpdate(props: Props) {
  const { image, onClose, session } = props
  const [changeFile, setChangeFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(image)
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
      const data = new FormData()
      changeFile && data.append('file', changeFile)

      await profileAvatarUpdateAction({ data: data, session: session })
        .then(async (res: any) => {
          if (res.status !== 200) toast.error(res.message)
          toast.success(res.message)
        })
        .catch((error: any) => {
          onClose()
          toast.error(error?.message)
        })
    } catch (error: any) {
      onClose()
      toast.error(error?.message || 'ocorreu um erro inesperado')
    } finally {
      onClose()
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 justify-center max-w-lg mx-auto py-2"
    >
      {previewUrl && (
        <MediaPreview src={previewUrl!} media={fileType! || 'image'} />
      )}
      <input
        id="file"
        type="file"
        accept="image/*"
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
      <Button
        type="button"
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => onClose()}
      >
        cancelar
      </Button>
    </form>
  )
}
