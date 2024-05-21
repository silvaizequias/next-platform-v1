'use client'

import Modal from '@/components/Modal'
import { useState, useCallback } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import CsvUpload from './CsvUpload'

interface Props {
  param: 'members' | 'orders' | 'tasks'
  document: string
}

export default function UploadDataButton(props: Props) {
  const { param, document } = props

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div>
      <span
        className="flex rounded-md bg-sky-600/50 hover:bg-sky-400 mx-auto p-2 cursor-pointer"
        onClick={handleModal}
      >
        <MdCloudUpload className="hover:text-white animate-pulse" size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`carregar planilha para integrar o conteúdo com a plataforma`}
      >
        <CsvUpload document={document} onClose={handleModal} param={param} />
      </Modal>
    </div>
  )
}
