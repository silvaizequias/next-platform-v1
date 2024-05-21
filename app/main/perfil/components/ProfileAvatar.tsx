'use client'

import Image from 'next/image'
import { Suspense, useCallback, useState } from 'react'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function ProfileAvatar({ image }: { image: string }) {
  const avatar = image || '/avatar.svg'

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-800 shadow-md rounded-md">
        <div className="m-2 w-['180px'] w-h-['180px']">
          {
            <Suspense fallback={'...carregando'}>
              <Image
                className="rounded-md cursor-pointer hover:opacity-80"
                onClick={handleModal}
                src={avatar}
                loading="lazy"
                alt="user"
                width={180}
                height={180}
              />
            </Suspense>
          }
        </div>
        <Modal
          open={openModal}
          onClose={handleModal}
          subtitle="atualizar imagem do perfil"
        >
          <ImageUpload
            onClose={handleModal}
            inputs={{
              imageUrl: avatar,
              param: 'user',
            }}
          />
        </Modal>
      </div>
    </div>
  )
}
