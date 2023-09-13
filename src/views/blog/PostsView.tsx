'use client'

import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/types'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { Suspense } from 'react'
import { PostType } from './types'
import ShowPostCard from './ShowPostCard'
import { grey } from '@mui/material/colors'

export default function PostsView(props: PageViewProps) {
  const { session, metadata } = props
  const { data: posts, mutate, error } = useFetch(`/api/blog/posts`)

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            borderRadius: 2,
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 220,
            bgcolor: 'hsl(0, 0%, 55%)',
            backgroundBlendMode: 'color-burn',
            backgroundImage: `url('/bg.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant='h4'
              fontWeight='600'
              textAlign='center'
              textTransform='uppercase'
              color={grey[50]}
            >
              Blog Dedicado Digital
            </Typography>
            <Divider
              sx={{
                color: grey[50],
                fontSize: 12,
                textTransform: 'uppercase',
                m: 2,
              }}
            >
              Conteúdo de Tecnologia
            </Divider>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}></Grid>
      <Suspense fallback={<Spinner />}>
        {posts ? (
          posts?.map((post: PostType) => (
            <Grid key={post?.id} item xs={12} sm={6} md={3}>
              <ShowPostCard post={post!} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12}></Grid>
        )}
      </Suspense>
    </Grid>
  )
}
