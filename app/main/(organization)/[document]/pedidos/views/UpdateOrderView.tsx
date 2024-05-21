'use client'

import { usePlatform } from '@/contexts/PlatformContext'
import Modal from '@/components/Modal'
import { OrderType } from '@/types/order'
import { UserType } from '@/types/user'
import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'
import CancelOrderButton from '../components/CancelOrderButton'
import AssignOrderToMemberForm from '../components/AssignOrderToMemberForm'

interface Props {
  order: OrderType | any
}

export default function UpdateOrderView(props: Props) {
  const { order } = props

  const { user }: UserType | any = usePlatform()

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
        subtitle={`atualizar pedido ${order?.code}`}
      >
        atualizar pedido
        <AssignOrderToMemberForm onClose={handleModal} />
        {!order?.canceled && (
          <CancelOrderButton
            canceled={order?.canceled}
            member={user}
            orderId={order?.id}
          />
        )}
      </Modal>
    </div>
  )
}
