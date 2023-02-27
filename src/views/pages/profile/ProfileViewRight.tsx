import { useRouter } from 'next/router'
import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

import ProfileViewSecurity from './ProfileViewSecurity'
import ProfileViewLogs from './ProfileViewLogs'
import { useSession } from 'next-auth/react'

interface Props {
  tab: string
}

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

export default function ProfileViewRight({ tab }: Props) {
  const { data: session } = useSession()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/profile/${value.toLowerCase()}`
      })
      .then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    logs: <ProfileViewLogs />,
    security: <ProfileViewSecurity />
  }

  return session ? (
    <Grid container spacing={6}>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='forced scroll tabs example'
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Tab
                    value='logs'
                    label='Registros de Acesso'
                    icon={<Icon icon='mdi:login' />}
                  />
                  <Tab
                    value='security'
                    label='Segurança'
                    icon={<Icon icon='mdi:lock-outline' />}
                  />
                </TabList>
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Box
                    sx={{
                      mt: 6,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <TabPanel sx={{ p: 0 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  ) : null
}
