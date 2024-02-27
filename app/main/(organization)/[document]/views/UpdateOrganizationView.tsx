'use client'

import Modal from '@/components/Modal'
import { OrganizationType } from '@/types/organization'
import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'
import UpdateOrganizationForm from './UpdateOrganizationForm'

interface Props {
  data: OrganizationType | any
}

export default function UpdateOrganizationView(props: Props) {
  const { data } = props

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
        subtitle={`atualizar informações da organização ${data?.name}`}
        size='max-w-xl'
      >
        <UpdateOrganizationForm data={data} onClose={handleModal} />
      </Modal>
    </div>
  )
}
