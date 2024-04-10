'use client'

import { Tab } from '@headlessui/react'
import DataPrivacyPolicy from './../contents/DataPrivacyPolicy.mdx'
import DataUsePolicy from './../contents/DataUsePolicy.mdx'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TermsAndPoliciesView() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
      <Tab.Group key={'privacy-policy'}>
        <Tab.List className="p-4 flex flex-col gap-4 rounded-md">
          <Tab
            key={'privacy-policy'}
            className={({ selected }) =>
              classNames(
                'w-full p-2 rounded-lg text-sm font-medium leading-5 shadow-md',
                selected
                  ? 'bg-slate-200 dark:bg-slate-200 shadow'
                  : 'hover:bg-slate-200 dark:bg-slate-400',
              )
            }
          >
            política de confidencialidade
          </Tab>
          <Tab
            key={'user-policy'}
            className={({ selected }) =>
              classNames(
                'w-full p-2 rounded-lg text-sm font-medium leading-5 shadow-md',
                selected
                  ? 'bg-slate-200 dark:bg-slate-200 shadow'
                  : 'hover:bg-slate-200 dark:bg-slate-400',
              )
            }
          >
            política de uso de dados
          </Tab>
        </Tab.List>
        <Tab.Panels className="flex flex-1 justify-center bg-slate-200 rounded-md shadow-md">
          <Tab.Panel
            key={'privacy-policy'}
            className={classNames('w-full p-4')}
          >
            <article className="prose prose-sm mx-auto lowercase">
              <DataPrivacyPolicy />
            </article>
          </Tab.Panel>
          <Tab.Panel key={'user-policy'} className={classNames('w-full p-4')}>
            <article className="prose prose-sm m-auto lowercase">
              <DataUsePolicy />
            </article>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
