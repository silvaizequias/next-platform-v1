'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  content?: string
  onClose: () => void
  open: boolean
  title?: string
}

export default function DialogModal(props: Props) {
  const { children, content, onClose, open, title } = props

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-20"
            enterTo="opacity-80"
            leave="ease-in duration-200"
            leaveFrom="opacity-80"
            leaveTo="opacity-20"
          >
            <div className="fixed inset-0 bg-slate-900/95" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-slate-200 p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h4"
                    className="text-xl font-medium leading-6 lowercase"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="my-2">
                    <p className="text-base text-opacity-50">{content}</p>
                  </div>
                  <div className="my-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
