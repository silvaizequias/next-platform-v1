'use client'

import { csvToJsonConverter } from '@/utils/handle-converter'
import { handleImpot } from '@/utils/handle-imports'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  document: string
  onClose: () => void
  param: 'members' | 'orders' | 'tasks'
}

export default function CsvUpload(props: Props) {
  const { document, onClose, param } = props

  const [csvFile, setCsvFile] = useState<File>()
  const [dataJson, setDataJson] = useState<[]>()
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleEventFile = useCallback(
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
        setCsvFile(file)
        setLoaded(true)
      }
      return null
    },
    [],
  )

  const handleConvertFile = useCallback(async () => {
    if (!csvFile) toast.error('o arquivo não foi carregado')
    const data = new FormData()
    csvFile && data.append('file', csvFile)

    await csvToJsonConverter(data)
      .then(async (data: any) => {
        setDataJson(data)
        onClose()
      })
      .catch((error) => toast.error(error?.message))
  }, [csvFile, onClose])

  const handleImportData = useCallback(async () => {
    if (!dataJson) return null
    return await handleImpot({
      data: dataJson,
      document: document,
      param: param,
    })
      .then((data) => {
        if (data?.message) {
          toast.error(data?.message)
        } else {
          toast.success(data)
        }
      })
      .catch((error) => toast.error(error?.message))
  }, [dataJson, document, param])

  useEffect(() => {
    dataJson && handleImportData()
  }, [dataJson, handleImportData])

  return (
    <div className="relative max-w-md flex flex-col justify-center gap-4">
      <div className="relative flex flex-col gap-4">
        <h4 className="text-lg text-center font-thin dark:text-slate-200">
          certifique-se de que a planilha de dados que está importando seja do{' '}
          <a href="#" target="_blank" className="underline font-extrabold">
            modelo adequado
          </a>{' '}
          para esta importação.
        </h4>
        <input
          className="block p-1 rounded-md bg-slate-200 text-sm font-thin"
          type="file"
          accept=".csv"
          onChange={handleEventFile}
        />
        <button
          className="w-full py-2 my-2 text-slate-50 font-semibold bg-sky-400/75 rounded-md hover:opacity-80 hover:shadow-md"
          type="button"
          hidden={!loaded}
          onClick={handleConvertFile}
        >
          importar planilha
        </button>
      </div>
    </div>
  )
}
