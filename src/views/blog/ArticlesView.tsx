'use client'

import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/types'
import { Box, Divider, Fab, Grid, Typography } from '@mui/material'
import { Fragment, Suspense, useState } from 'react'
import { ArticleType } from './types'
import ShowArticleCard from './ShowArticleCard'
import { blue, grey } from '@mui/material/colors'
import ShowInDialog from '@/components/ShowInDialog'
import ArticleCreateForm from './forms/ArticleCreateForm'
import { MdOutlineAdd } from 'react-icons/md'

export default function ArticleView(props: PageViewProps) {
  const { session, metadata } = props
  const { data: articles, mutate, error } = useFetch<ArticleType[]>(`/api/blog/articles`)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

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
        {articles?.length! > 0 ? (
          articles?.map((article: ArticleType) => (
            <Grid key={article?.id!} item xs={12} sm={6} md={3}>
              <ShowArticleCard article={article!} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12}></Grid>
        )}
      </Suspense>
      {session && session.user.role == 'MASTER' && (
        <Fragment>
          <Fab
            sx={{
              position: 'absolute',
              mb: 12,
              bottom: 20,
              right: 20,
              color: 'common.white',
              bgcolor: blue[400],
              '&:hover': {
                bgcolor: blue[600],
              },
              fontSize: 24,
            }}
            onClick={handleDialog}
          >
            <MdOutlineAdd />
          </Fab>
          <ShowInDialog
            open={openDialog}
            onClose={handleDialog}
            title='Criar Artigo'
          >
            <ArticleCreateForm
              userId={session?.user?.id!}
              onClose={handleDialog}
            />
          </ShowInDialog>
        </Fragment>
      )}
    </Grid>
  )
}
