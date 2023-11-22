'use client'

import DialogBox from '@/components/dialog-box'
import { Button } from '@nextui-org/react'
import { Session } from 'next-auth'
import { Fragment, useCallback, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'

interface Props {
  session: Session
}

export default function AddOrganization(props: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { session } = props

  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <Fragment>
      <Button
        className="uppercase"
        name="Criar Organização"
        variant="flat"
        color="success"
        size="sm"
        startContent={<HiPlus />}
        onClick={handleModal}
      >
        Criar
      </Button>
      <DialogBox
        opened={openModal}
        close={handleModal}
        title={'Criar Nova Organização'}
      >
        ...
      </DialogBox>
    </Fragment>
  )
}
