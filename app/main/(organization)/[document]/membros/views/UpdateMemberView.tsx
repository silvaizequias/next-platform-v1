'use client'

import Modal from '@/components/Modal'
import { MemberType } from '@/types/organization'

import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'
import UpdateMemberForm from '../components/UpdateMemberForm'
import { useSession } from 'next-auth/react'

interface Props {
  member: MemberType
}

export default function UpdateMemberView(props: Props) {
  const { member } = props

  const { data: session } = useSession()
  const userId: string = session?.user?.id ?? ''
  const memberUserId = member?.userId
  let myself: boolean = userId == memberUserId

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return !myself ? (
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
        subtitle={`atualizar informações do membro ${
          member?.user?.name ?? ''
        } na organização`}
      >
        <UpdateMemberForm member={member} onClose={handleModal} />
      </Modal>
    </div>
  ) : null
}
