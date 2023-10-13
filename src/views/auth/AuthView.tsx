import { Box, Card } from '@mui/material'
import AuthTabsView from './AuthTabsView'

export default function AuthView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card elevation={4} sx={{ maxWidth: 480 }}>
        <AuthTabsView />
      </Card>
    </Box>
  )
}
