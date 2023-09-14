'use client'

import parse from 'html-react-parser'
import { useFetch } from '@/hooks/useFetch'
import {
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { ArticleType, ArticleViewProps } from './types'
import { Fragment, Suspense } from 'react'
import Spinner from '@/components/Spinner'
import { blue, green, grey } from '@mui/material/colors'
import { MdKeyboardReturn, MdShare, MdThumbUp } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export default function ArticleView(props: ArticleViewProps) {
  const { session, slug } = props
  const {
    data: article,
    mutate,
    error,
  } = useFetch<ArticleType>(`/api/blog/article/${slug}`)

  const router = useRouter()

  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={2} marginTop={1}>
        {article && article?.isAvaliable ? (
          <Fragment>
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
                  backgroundImage: `url(${article?.image! || '/bg.jpg'})`,
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Tooltip title='Outros Artigos'>
                    <IconButton
                      sx={{
                        p: 1,
                        ml: 1,
                        color: grey[400],
                        '&:hover': {
                          color: grey[600],
                        },
                      }}
                      size='small'
                      onClick={() => router.push('/blog')}
                    >
                      <MdKeyboardReturn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Compartilhar'>
                    <IconButton
                      sx={{
                        p: 1,
                        ml: 1,
                        color: green[400],
                        '&:hover': {
                          color: green[600],
                        },
                      }}
                      size='small'
                    >
                      <MdShare />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Curtir'>
                    <IconButton
                      sx={{
                        p: 1,
                        ml: 1,
                        color: blue[400],
                        '&:hover': {
                          color: blue[600],
                        },
                      }}
                      size='small'
                    >
                      <Badge badgeContent={article?.like!} color='primary'>
                        <MdThumbUp />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant='body2' marginRight={2}>
                  Publicado em {new Date(article?.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontStyle: 'italic',
                  px: 6,
                }}
              >
                <Typography variant='caption' textAlign={'center'}>
                  {parse(`${article?.resume}`)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card
                sx={{ width: '100%', typography: 'body1', bgcolor: grey[100] }}
              >
                <CardContent>
                  <Typography variant='body1' textAlign={'justify'}>
                    {parse(`${article?.content}`)}
                  </Typography>
                </CardContent>
              </Card>
              <Typography variant='body2' my={2} mr={2} textAlign={'right'}>
                Publicado por {article?.user?.name}
              </Typography>
            </Grid>
          </Fragment>
        ) : (
          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: 'flex',
                alignContent: 'cener',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </Box>
          </Grid>
        )}
      </Grid>
    </Suspense>
  )
}
