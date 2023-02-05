import { Typography, Button } from '@mui/material'
import HeaderLayout from './HeaderLayout'

const backgroundImage = '/bg/bg-header.jpg'

export default function Header() {
  return (
    <HeaderLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'black',
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2'>
        SOLUÇÕES CRIATIVAS PARA ENRIQUECER SEU NEGÓCIO
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Disponibilizamos uma ferramenta flexível e inovadora que aumenta a
        produtividade de pessoas e organizações.
      </Typography>
      <Button
        color='info'
        variant='contained'
        size='large'
        component='a'
        href='/'
        sx={{ minWidth: 200, mt: { xs: 4, sm: 10 } }}
      >
        REGISTRE-SE
      </Button>
      <Typography variant='body2' color='inherit' sx={{ mt: 2 }}>
        E TENHA UM SISTEMA DEDICADO
      </Typography>
    </HeaderLayout>
  )
}
