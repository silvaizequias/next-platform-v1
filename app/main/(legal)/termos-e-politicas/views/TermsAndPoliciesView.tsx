'use client'

import { Tab } from '@headlessui/react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TermsAndPoliciesView() {
  return (
    <div className="flex flex-col">
      <Tab.Group key={'privacy-policy'}>
        <Tab.List className="p-2 flex space-x-2 rounded-md bg-slate-200 dark:bg-slate-800">
          <Tab
            key={'privacy-policy'}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-slate-400 dark:bg-slate-800 shadow'
                  : 'hover:bg-slate-100 dark:bg-slate-400',
              )
            }
          >
            política de confidencialidade
          </Tab>
          <Tab
            key={'user-policy'}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-slate-400 dark:bg-slate-800 shadow'
                  : 'hover:bg-slate-100 dark:bg-slate-400',
              )
            }
          >
            política de uso de dados
          </Tab>
        </Tab.List>
        <Tab.Panels className="my-2">
          <Tab.Panel
            key={'privacy-policy'}
            className={classNames('rounded-md bg-slate-200 p-4')}
          >
            <div className="prose"></div>
          </Tab.Panel>
          <Tab.Panel
            key={'user-policy'}
            className={classNames('rounded-md bg-slate-200 p-4')}
          >
            <div className="prose">
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
