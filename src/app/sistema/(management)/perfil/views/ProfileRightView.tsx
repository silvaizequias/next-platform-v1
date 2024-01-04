'use client'

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'
import { createElement } from 'react'
import { MdContacts, MdLocationOn, MdPassword } from 'react-icons/md'
import ProfileInformationUpdate from './ProfileInformationUpdate'
import { UserType } from '@/types/platform-management/user'
import ProfilePasswordUpdate from './ProfilePasswordUpdate'
import ProfileAddressUpdate from './ProfileAddressUpdate'

interface Props {
  profile: UserType
}

export default function ProfileRightView(props: Props) {
  const { profile } = props

  return (
    <div className="w-full">
      <Tabs value={'informations'}>
        <TabsHeader>
          <Tab key={'informations'} value={'informations'}>
            <div className="flex items-center gap-2 lowercase">
              {createElement(MdContacts, { className: 'w-5 h-5' })}
              {'Informações'}
            </div>
          </Tab>
          <Tab key={'address'} value={'address'}>
            <div className="flex items-center gap-2 lowercase">
              {createElement(MdLocationOn, { className: 'w-5 h-5' })}
              {'Endereços'}
            </div>
          </Tab>
          <Tab key={'password'} value={'password'}>
            <div className="flex items-center gap-2 lowercase">
              {createElement(MdPassword, { className: 'w-5 h-5' })}
              {'Senha'}
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={'informations'} value={'informations'}>
            <ProfileInformationUpdate profile={profile} />
          </TabPanel>
          <TabPanel key={'address'} value={'address'}>
            <ProfileAddressUpdate profile={profile} />
          </TabPanel>
          <TabPanel key={'password'} value={'password'}>
            <ProfilePasswordUpdate />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}
