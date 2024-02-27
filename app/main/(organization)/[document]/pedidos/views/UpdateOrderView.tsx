'use client'

import Modal from '@/components/Modal'
import { OrderType } from '@/types/order'
import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'
import UpdateOrderForm from './UpdateOrderForm'

interface Props {
  data: OrderType | any
  authorizationKey: string
}

export default function UpdateOrderView(props: Props) {
  const { authorizationKey, data } = props

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
        <MdEditSquare size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`atualizar pedido ${data?.code}`}
      >
        <UpdateOrderForm
          data={data}
          onClose={handleModal}
          authorizationKey={authorizationKey}
        />
      </Modal>
    </div>
  )
}
