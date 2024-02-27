'use client'

import Modal from '@/components/Modal'
import { OrganizationUserType } from '@/types/organization-user'
import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'
import UpdateUserForm from './UpdateUserForm'

interface Props {
  data: OrganizationUserType | any
}

export default function UpdateUserView(props: Props) {
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
        subtitle={`atualizar informações do usuário ${data?.user?.name} organização`}
      >
        <UpdateUserForm data={data} onClose={handleModal} />
      </Modal>
    </div>
  )
}
