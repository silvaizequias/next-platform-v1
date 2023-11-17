'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { TermItemType, TermType, termsOfService, termsOfUsage } from './terms'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TermosOfServiceTabs() {
  let [categories] = useState({
    'Termos de Serviço': termsOfService,
    'Termos de Uso': termsOfUsage,
  })

  return (
    <Tab.Group>
      <Tab.List className="py-2 px-4 rounded-md dark:bg-slate-900 bg-slate-100 flex gap-4 ">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-md py-2 uppercase font-medium leading-5',
                'ring-zinc-200/50 ring-offset-2 ring-offset-slate-200 dark:ring-offset-slate-800 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-slate-800 text-zinc-200 dark:bg-slate-200 dark:text-zinc-600 shadow-md'
                  : 'bg-slate-200 text-zinc-600 dark:bg-slate-800 dark:text-zinc-200 hover:opacity-50',
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="my-4">
        {Object.values(categories).map((terms, idx) => (
          <Tab.Panel
            key={idx}
            className={classNames('p-4 rounded-md bg-slate-100')}
          >
            <div className="mx-auto text-zinc-600">
              {terms.map((term: TermType) => (
                <div key={term?.id} className="py-2">
                  <div className="flex gap-2 text-lg sm:text-xl font-medium">
                    <span className='tabular-numstext-inherit'>{term?.id}</span>
                    <h4 className="uppercase">
                      {term?.topic}
                    </h4>
                  </div>
                  <p className="text-justify">{term?.content}</p>
                  {term?.items?.map((item: TermItemType) => (
                    <ul key={item?.id}>
                      <li className="pl-2 sm:pl-4">
                        <span className="text-sm sm:text-md capitalize">
                          - {item?.title}
                        </span>
                        <p className="italic text-xs pl-1">
                          {item?.description}
                        </p>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
