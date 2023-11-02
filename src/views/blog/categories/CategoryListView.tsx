'use client'

import useFetch from '@/hooks/useFetch'
import { Grid } from '@mui/material'

export default function CategoryListView() {
  const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!

  const { data: categories } = useFetch(`${BLOG_API_URL}/categories`)

  return (
    <Grid container spacing={2} marginY={10}>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}
