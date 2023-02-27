import { Typography, Button } from '@mui/material'
import ErrorLayout from './ErrorLayout'

import Link from 'next/link'

const backgroundImage = '/bg/bg-error-page.jpg'

export default function Error500Page() {
  return (
    <ErrorLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'black',
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='Sistema Dedicado'
      />
      <Typography
        color='lightskyblue'
        align='center'
        variant='h4'
        sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
      >
        Erro Interno do Servidor 👨🏻‍💻
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h6'
        sx={{ mb: 4, mt: { xs: 4, sm: 10 }, fontWeight: 'light' }}
      >
        Oops, aldo de errado não está certo!
      </Typography>
      <Button
        color='primary'
        variant='contained'
        size='large'
        href='/'
        component={Link}
        sx={{ mx: 2, minWidth: 200, mt: { xs: 4, sm: 10 } }}
      >
        IR PARA O INÍCIO
      </Button>
    </ErrorLayout>
  )
}
