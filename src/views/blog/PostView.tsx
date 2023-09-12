'use client'

import { useFetch } from '@/hooks/useFetch'
import { Grid } from '@mui/material'
import { Session } from 'next-auth'

interface Props {
  session: Session | null
  slug: string
}

export default function PostView(props: Props) {
  const { session, slug } = props
  const { data: post, mutate, error } = useFetch(`/api/blog/post/${slug}`)

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} sm={12}></Grid>
    </Grid>
  )
}
