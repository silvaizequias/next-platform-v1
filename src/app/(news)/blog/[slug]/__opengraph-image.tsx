import { ArticleType } from '@/views/blog/types'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { ImageResponse } from 'next/server'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function og({ params }: { params: { slug: string } }) {
  const { slug } = params
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const unsplashRandom = 'https://source.unsplash.com/random/?color-background'

  const article: ArticleType = (
    await axios.get(`${NEXTAUTH_URL}/api/blog/article/${slug}`)
  ).data

  //TODO: melhorar imagem
  return new ImageResponse(
    (
      <Box
        sx={{
          borderRadius: 2,
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 220,
          bgcolor: 'hsl(0, 0%, 55%)',
          backgroundBlendMode: 'darken',
          backgroundImage: `url(${
            article?.image! || unsplashRandom
          } + '&w=1200&h=630&auto=format&q=75')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Typography
          variant='h4'
          fontWeight='600'
          textAlign='center'
          textTransform='uppercase'
          color={grey[50]}
        >
          {article?.title}
        </Typography>
      </Box>
    ),
    size,
  )
}
