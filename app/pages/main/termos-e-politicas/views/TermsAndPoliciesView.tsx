'use client'

import { Tab } from '@headlessui/react'
import DataPrivacyPolicy from './../contents/DataPrivacyPolicy.mdx'
import DataUsePolicy from './../contents/DataUsePolicy.mdx'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TermsAndPoliciesView() {
  return (
    <div className="w-full mx-auto p-8 sm:max-w-4xl">
      <Tab.Group
        key={'privacy-policy'}
        className={'w-full flex flex-col sm:flex-row gap-4 sm:gap-2 '}
      >
        <Tab.List className="w-full sm:w-1/3 flex flex-col gap-4">
          <Tab
            key={'privacy-policy'}
            className={({ selected }) =>
              classNames(
                'w-full flex p-2 rounded-md bg-sky-400 text-xs font-medium text-white uppercase',
                selected ? 'bg-sky-800 shadow' : 'hover:bg-sky-600/40',
              )
            }
          >
            Confidencialidade
          </Tab>
          <Tab
            key={'user-policy'}
            className={({ selected }) =>
              classNames(
                'w-full flex p-2 rounded-md bg-sky-400 text-xs font-medium text-white uppercase',
                selected ? 'bg-sky-800 shadow' : 'hover:bg-sky-600/40',
              )
            }
          >
            Uso de Dados
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full flex justify-center bg-slate-200 rounded-md shadow-md">
          <Tab.Panel
            key={'privacy-policy'}
            className={classNames('w-full p-4')}
          >
            <article className="prose mx-auto">
              <DataPrivacyPolicy />
            </article>
          </Tab.Panel>
          <Tab.Panel key={'user-policy'} className={classNames('w-full p-4')}>
            <article className="prose mx-auto">
              <DataUsePolicy />
            </article>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
