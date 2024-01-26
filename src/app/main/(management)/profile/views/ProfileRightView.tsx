'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import { UserProps } from '../../users/types'
import { createElement } from 'react'
import { IdentificationIcon, KeyIcon } from '@heroicons/react/24/outline'
import ProfilePasswordUpdateFormView from './ProfilePasswordUpdateFormView'
import ProfileInformationUpdateFormView from './ProfileInformationUpdateFormView'

export default function ProfileRightView(props: UserProps) {
  const { data } = props

  return (
    <div className="py-6">
      <Card className="w-full">
        <CardHeader
          variant="gradient"
          color="light-blue"
          className="mb-4 grid h-16 place-items-center"
        >
          <Typography variant="h4" color="white">
            informações do perfil
          </Typography>
        </CardHeader>
        <CardBody color="slate">
          <Tabs value={'informations'}>
            <TabsHeader>
              <Tab key={'informations'} value={'informations'}>
                <div className="flex items-center gap-2">
                  {createElement(IdentificationIcon, {
                    className: 'w-5 h-5',
                  })}
                </div>
              </Tab>
              <Tab key={'password'} value={'password'}>
                <div className="flex items-center gap-2">
                  {createElement(KeyIcon, {
                    className: 'w-5 h-5',
                  })}
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel key={'informations'} value={'informations'}>
                <ProfileInformationUpdateFormView data={data} />
              </TabPanel>
              <TabPanel key={'password'} value={'password'}>
                <ProfilePasswordUpdateFormView />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
