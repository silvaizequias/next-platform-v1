'use client'

import Modal from '@/components/Modal'
import { useState, useCallback } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import CreateOrderForm from './CreateOrderForm'

interface Props {
  authorizationKey: string
}

export default function CreateOrderView(props: Props) {
  const { authorizationKey } = props
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div>
      <span
        className="flex rounded-full mx-auto p-1 cursor-pointer hover:opacity-50 hover:shadow-md"
        onClick={handleModal}
      >
        <MdLibraryAdd size={24} />
      </span>
      <Modal open={openModal} onClose={handleModal} subtitle={`criar pedido`}>
        <CreateOrderForm
          onClose={handleModal}
          authorizationKey={authorizationKey}
        />
      </Modal>
    </div>
  )
}
