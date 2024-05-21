'use client'

import Image from 'next/image'
import {
  handleUploadFileToS3,
  handleUploadImage,
} from '@/utils/handle-upload-objects'
import {
  ChangeEvent,
  Suspense,
  useCallback,
  useState,
  useTransition,
} from 'react'
import toast from 'react-hot-toast'
import { HandleUploadImageType } from '@/utils/handle-upload-objects/types'

interface Props {
  onClose: () => void
  inputs: HandleUploadImageType
}

export default function ImageUpload(props: Props) {
  const { inputs, onClose } = props
  const [isPending, startTransition] = useTransition()

  const [uploadFile, setUploadFile] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string | null>(inputs?.imageUrl)
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleUploadFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let file = event.target.files?.[0] as File
      let size = file?.size
      if (!file) {
        toast.error('o arquivo não foi carregado corretamente')
        return null
      }
      if (size > 1024 * 1024 * 10) {
        toast.error(`o arquivo é maior que 10Mb`)
        return null
      } else {
        let url = URL?.createObjectURL(file)
        setUploadFile(file)
        startTransition(() => setPreviewUrl(url))
        setLoaded(true)
      }
      return null
    },
    [],
  )

  const handleSendFile = useCallback(async () => {
    if (!uploadFile) toast.error('o arquivo não foi carregado')
    const data = new FormData()
    uploadFile && data.append('file', uploadFile)

    return await handleUploadFileToS3({ data: data })
      .then(async (data) => {
        await handleUploadImage({
          imageUrl: data?.url,
          param: inputs?.param,
          paramId: inputs?.paramId,
        }).then(() => {
          toast.success('sua imagem foi atualizada')
          onClose()
        })
      })
      .catch((error: any) => toast.error(error?.message))
  }, [inputs, onClose, uploadFile])

  return (
    <div className="relative flex flex-col justify-center gap-4">
      <div className="p-4 flex justify-center">
        {
          <Suspense fallback={'...carregando'}>
            <Image
              className="rounded-md"
              src={previewUrl || inputs?.imageUrl}
              loading="lazy"
              alt="user"
              width={218}
              height={218}
            />
          </Suspense>
        }
      </div>
      <hr className="border-1 border-slate-400" />
      <div className="relative flex flex-col">
        <input
          className="block p-1 rounded-md bg-slate-200 text-sm font-thin"
          type="file"
          accept="image/*"
          onChange={handleUploadFile}
        />
        <button
          className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
          type="button"
          hidden={!loaded}
          onClick={handleSendFile}
        >
          atualizar imagem
        </button>
      </div>
    </div>
  )
}
