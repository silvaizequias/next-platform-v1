'use client'

import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/types'
import { Grid } from '@mui/material'

export default function PostsView(props: PageViewProps) {
  const { session, metadata } = props
  const { data: posts, mutate, error } = useFetch(`/api/blog/posts`)

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} sm={12}></Grid>
    </Grid>
  )
}
