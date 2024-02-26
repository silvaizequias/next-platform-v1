'use client'

import Modal from '@/components/Modal'
import { useState, useCallback } from 'react'
import { MdOutlineDomainAdd } from 'react-icons/md'
import CreateOrganizationForm from './CreateOrganizationForm'
import { useSession } from 'next-auth/react'

export default function CreateOrganizationView() {
  const { data: session } = useSession()
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
        <MdOutlineDomainAdd size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`criar minha organização`}
        size='max-w-xl'
      >
        <CreateOrganizationForm onClose={handleModal} session={session!} />
      </Modal>
    </div>
  )
}
