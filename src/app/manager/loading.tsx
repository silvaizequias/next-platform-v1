import LoadingLayout from '@/layouts/LoadingLayout'
import { CircularProgress } from '@mui/material'

export default async function Loading() {
  return (
    <LoadingLayout>
      <CircularProgress disableShrink sx={{ m: 4 }} /> loading...
    </LoadingLayout>
  )
}
