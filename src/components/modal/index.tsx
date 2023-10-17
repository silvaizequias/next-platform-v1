import { Dialog, Transition } from '@headlessui/react'
import { ModalProps } from './@types'
import { Fragment } from 'react'
import { HiXCircle } from 'react-icons/hi'

export default function Modal(props: ModalProps) {
  const { children, open, onClose, subtitle, title } = props

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-white align-middle shadow-xl transition-all pb-2'>
                <div className='flex justify-end mt-0 ml-0 p-1'>
                  <div
                    className='text-rose-600 hover:text-rose-400 cursor-pointer'
                    onClick={onClose}
                  >
                    <HiXCircle size={24} />
                  </div>
                </div>
                <Dialog.Title
                  as='h3'
                  className='mx-auto text-lg text-center text-gray-800 font-medium leading-6 uppercase'
                >
                  {title}
                </Dialog.Title>
                <div className='m-2 p-2'>
                  <p className='text-xs text-gray-600'>{subtitle}</p>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
