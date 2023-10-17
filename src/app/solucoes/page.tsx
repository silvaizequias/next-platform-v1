import SolutionsView from '@/views/solutions'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Soluções Personalizadas',
}

export default function ServicePage() {
  return (
    <Fragment>
      <SolutionsView />
    </Fragment>
  )
}
