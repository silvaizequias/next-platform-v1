'use client'

import Container from '@/components/container'
import { useParams } from 'next/navigation'

export default function PostDetailView() {
  const params: any = useParams()
  const { slug } = params

  return (
    <Container>
      <span>{slug}</span>
    </Container>
  )
}
