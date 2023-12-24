'use client'

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'
import { createElement, useState } from 'react'
import { MdContacts, MdLocationOn, MdPassword } from 'react-icons/md'
import ProfileInformationTabView from './tabs/ProfileInformationTabView'
import ProfileAddressTabView from './tabs/ProfileAddressTabView'
import ProfilePasswordTabView from './tabs/ProfilePasswordTabView'

export default function ProfileRightView() {
  const [TABS] = useState([
    {
      icon: MdContacts,
      label: 'Informações',
      value: 'informations',
      content: ProfileInformationTabView,
    },
    {
      icon: MdLocationOn,
      label: 'Endereço',
      value: 'address',
      content: ProfileAddressTabView,
    },
    {
      icon: MdPassword,
      label: 'Senha',
      value: 'password',
      content: ProfilePasswordTabView,
    },
  ])

  return (
    <div className='w-full'>
    <Tabs value={'informations'}>
      <TabsHeader>
        {TABS.map((tab) => (
          <Tab key={tab?.value} value={tab?.value}>
            <div className="flex items-center gap-2 lowercase">
              {createElement(tab?.icon, { className: 'w-5 h-5' })}
              {tab?.label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {TABS.map((tab) => (
          <TabPanel key={tab?.value} value={tab?.value}>
            {createElement(tab?.content)}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  )
}
