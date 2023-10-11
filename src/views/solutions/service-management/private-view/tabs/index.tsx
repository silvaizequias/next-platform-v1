import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { SyntheticEvent, useState } from 'react'
import OrdersTab from './OrdersTab'
import ImportationsTab from './ImportationsTab'
import { MdCloudUpload, MdOutlineListAlt } from 'react-icons/md'

export default function TabsPrivateView() {
  const [value, setValue] = useState<string>('orders')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 4,
          borderColor: blue[600],
          bgcolor: grey[50],
        }}
      >
        <TabList onChange={handleChange} centered>
          <Tab
            icon={<MdOutlineListAlt />}
            iconPosition='start'
            label='Ordens de Serviço'
            value={'orders'}
          />
          <Tab
            icon={<MdCloudUpload />}
            iconPosition='start'
            label='Importações'
            value={'importations'}
          />
        </TabList>
      </Box>
      <TabPanel value={'orders'}>
        <OrdersTab />
      </TabPanel>
      <TabPanel value={'importations'}>
        <ImportationsTab />
      </TabPanel>
    </TabContext>
  )
}
