import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface Props {
  children: ReactNode
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md'
  subtitle?: string
  title?: string
}

export default function Modal(props: Props) {
  const { children, open, onClose, size, subtitle, title } = props

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className={`w-full max-w-${size || 'sm'} transform overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all`}>
                <Dialog.Title
                  as="h4"
                  className="text-lg font-semibold leading-6 text-sky-600"
                >
                  {title || 'dedicado'}
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
