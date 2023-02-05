import { Box, Container } from '@mui/material'
import { SxProps } from '@mui/system'
import { Theme, styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'

const HeaderayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
    minHeight: 600,
    maxHeight: 1300,
  },
}))

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
})

interface HeroLayoutProps {
  sxBackground: SxProps<Theme>
}

export default function HeaderLayout(
  props: React.HTMLAttributes<HTMLDivElement> & HeroLayoutProps,
) {
  const { sxBackground, children } = props

  return (
    <HeaderayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src='/logo/500x250-logotipo8.png'
          alt='Sistema Dedicado'
          width='500'
          height='250'
        />
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.8,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box sx={{mt: 14}}>
          <Icon icon='mdi:arrow-down-drop-circle' />
        </Box>
      </Container>
    </HeaderayoutRoot>
  )
}
