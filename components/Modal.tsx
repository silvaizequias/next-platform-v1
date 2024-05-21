import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { MdOutlineClose } from 'react-icons/md'

interface Props {
  children: ReactNode
  open: boolean
  onClose: () => void
  size?: 'w-sm' | 'w-md' | 'w-lg' | 'w-xl' | 'w-full'
  subtitle?: string
  title?: string
}

export default function Modal(props: Props) {
  const { children, open, onClose, size, subtitle, title } = props

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-800/80 dark:bg-slate-400/80" />
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
              <Dialog.Panel
                className={`${
                  size || 'max-w-full'
                } transform overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="div"
                  className="flex item-center justify-between"
                >
                  <h4 className="text-lg font-semibold leading-6 text-sky-600">
                    {title || 'dedicado'}
                  </h4>
                  <div className="flex flex-1 justify-end">
                    <span
                      className="flex rounded-full bg-slate-100 hover:bg-slate-200 text-red-200 hover:text-red-400 cursor-pointer"
                      onClick={onClose}
                    >
                      <MdOutlineClose size={24} />
                    </span>
                  </div>
                </Dialog.Title>
                <div className="my-4 flex flex-col gap-4">
                  <p className="text-xs text-center text-opacity-25">
                    {subtitle}
                  </p>
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
