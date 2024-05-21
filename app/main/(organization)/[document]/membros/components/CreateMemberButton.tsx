'use client'

import Modal from '@/components/Modal'
import { useState, useCallback } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import CreateMemberForm from './CreateMemberForm'

export default function CreateMemberButton() {
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
        <MdLibraryAdd className="hover:text-white animate-pulse" size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`adicionar membro nesta organização`}
      >
        <CreateMemberForm onClose={handleModal} />
      </Modal>
    </div>
  )
}
