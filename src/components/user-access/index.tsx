'use client'

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'
import { createElement } from 'react'
import {
  MdOutlineFolderShared,
  MdOutlineLogin,
  MdOutlinePassword,
} from 'react-icons/md'
import SignInForm from './signin'
import SignUpForm from './signup'
import ResetPasswordForm from './reset-password'

export default function UserAccess() {
  return (
    <div className="min-w-full">
      <Tabs value="signin">
        <TabsHeader>
          <Tab key={'signin'} value={'signin'}>
            <div className="flex items-center gap-2">
              {createElement(MdOutlineLogin, { className: 'w-5 h-5' })}
            </div>
          </Tab>
          <Tab key={'signup'} value={'signup'}>
            <div className="flex items-center gap-2">
              {createElement(MdOutlineFolderShared, { className: 'w-5 h-5' })}
            </div>
          </Tab>
          <Tab key={'reset-password'} value={'reset-password'}>
            <div className="flex items-center gap-2">
              {createElement(MdOutlinePassword, { className: 'w-5 h-5' })}
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={'signin'} value={'signin'}>
            <SignInForm />
          </TabPanel>
          <TabPanel key={'signup'} value={'signup'}>
            <SignUpForm />
          </TabPanel>
          <TabPanel key={'reset-password'} value={'reset-password'}>
            <ResetPasswordForm />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}
