'use client'

import Drawer from '@/components/drawer'
import Modal from '@/components/modal'
import { useState } from 'react'

export default function TempPage() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <div className='flex flex-col'>
      <div className='fixed inset-0 flex items-center justify-center gap-2'>
        <button
          type='button'
          onClick={handleModal}
          className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          Open Modal
        </button>
        <Modal open={openModal} onClose={handleModal} />

        <button
          type='button'
          onClick={handleDrawer}
          className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          Open Drawer
        </button>
        <Drawer open={openDrawer} onClose={handleDrawer} />
      </div>
    </div>
  )
}
