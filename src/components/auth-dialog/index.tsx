'use client'

import { createElement, useCallback, useState } from 'react'
import DialogModal from '../dialog-modal'
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'
import {
  ArrowRightEndOnRectangleIcon,
  IdentificationIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import SignInFormView from '@/app/main/(auth)/autenticar-se/views/SignInFormView'
import SignUpFormView from '@/app/main/(auth)/registrar-se/views/SignUpFormView'
import ResetPasswordFormView from '@/app/main/(auth)/redefinir-senha/views/ResetPasswordFormView'

export default function AuthDialog() {
  const [openDialogAuth, setOpenDialogAuth] = useState<boolean>(false)

  const handleDialogAuth = useCallback(() => {
    setOpenDialogAuth(!openDialogAuth)
  }, [openDialogAuth])

  return (
    <div className="relative block items-center">
      <Button type="button" color="light-blue" onClick={handleDialogAuth}>
        autenticar-se
      </Button>
      <DialogModal
        onClose={handleDialogAuth}
        open={openDialogAuth}
        title="dedicado"
      >
        <Tabs value={'sign-in'}>
          <TabsHeader>
            <Tab key={'sign-in'} value={'sign-in'}>
              <div className="flex items-center gap-2">
                {createElement(ArrowRightEndOnRectangleIcon, {
                  className: 'w-5 h-5',
                })}
              </div>
            </Tab>
            <Tab key={'sign-up'} value={'sign-up'}>
              <div className="flex items-center gap-2">
                {createElement(IdentificationIcon, {
                  className: 'w-5 h-5',
                })}
              </div>
            </Tab>
            <Tab key={'reset-password'} value={'reset-password'}>
              <div className="flex items-center gap-2">
                {createElement(KeyIcon, {
                  className: 'w-5 h-5',
                })}
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key={'sign-in'} value={'sign-in'}>
              <SignInFormView close={handleDialogAuth} />
            </TabPanel>
            <TabPanel key={'sign-up'} value={'sign-up'}>
              <SignUpFormView close={handleDialogAuth} />
            </TabPanel>
            <TabPanel key={'reset-password'} value={'reset-password'}>
              <ResetPasswordFormView close={handleDialogAuth} />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </DialogModal>
    </div>
  )
}
