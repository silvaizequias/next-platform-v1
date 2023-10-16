import SupportView from '@/views/support'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suporte Especializado',
}

export default function SupportPage() {
  return <SupportView />
}
