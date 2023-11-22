import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { HiOutlineX } from 'react-icons/hi'

interface Props {
  children: ReactNode
  close: () => void
  opened: boolean
  title?: string
}

export default function DialogBox(props: Props) {
  const { children, close, opened, title } = props

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-800/50 dark:bg-slate-200/50" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800 p-4 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 uppercase"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="flex flex-1 justify-end" onClick={close}>
                    <span className="cursor-pointer rounded-full p-1 hover:opacity-50 hover:bg-opacity-25 shadow-md">
                      <HiOutlineX />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center w-full">
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
