import SolutionsView from '@/views/solutions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soluções Personalizadas',
}

export default function ServicePage() {
  return <SolutionsView />
}
