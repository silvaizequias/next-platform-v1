'use client'

import Modal from '@/components/Modal'
import { useState, useCallback } from 'react'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import CreateUserForm from './CreateUserForm'

export default function CreateUserView() {
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
        <MdOutlinePersonAddAlt1 size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`adicionar usuário na organização`}
      >
        <CreateUserForm onClose={handleModal} />
      </Modal>
    </div>
  )
}
