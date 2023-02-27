// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='body2' sx={{ mr: 2 }}>
        {`© 2021 a ${new Date().getFullYear()} - 41.059.953/0001-02 - `}
        <Link target='_blank' href='https://www.sistemadedicado.com/'>
          Sistema Dedicado
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link variant='body2' href='#'>
            Termos de Serviço
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
