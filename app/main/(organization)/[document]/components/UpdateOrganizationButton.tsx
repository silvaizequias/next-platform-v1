'use client'

import AddressForm from '@/components/AddressForm'
import Modal from '@/components/Modal'
import { useOrganization } from '@/contexts/OrganizationContext'
import { AddressType } from '@/types/address'
import { OrganizationType } from '@/types/organization'
import { useState, useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'

interface Props {}

export default function UpdateOrganizationButton(props: Props) {
  const {} = props
  const { organization }: OrganizationType | any = useOrganization()

  const address: AddressType = {
    zipCode: organization?.zipCode,
    street: organization?.street,
    complement: organization?.complement,
    latitude: organization?.latitude,
    longitude: organization?.longitude,
  }

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div>
      <span
        className="flex rounded-md bg-sky-600/50 hover:bg-sky-400 mx-auto p-1 cursor-pointer"
        onClick={handleModal}
      >
        <MdEditSquare className="hover:text-white" size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle={`atualizar informações da organização`}
      >
        <AddressForm
          address={address}
          param={'organization'}
          paramId={organization?.id}
        />
      </Modal>
    </div>
  )
}
