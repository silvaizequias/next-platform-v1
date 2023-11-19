'use client'

import Container from '@/components/container'
import { usePathname } from 'next/navigation'

export default function PostDetailView() {
  const pathname = usePathname()
  const slug = pathname.split('/blog/')

  return (
    <Container>
      <span>{slug}</span>
    </Container>
  )
}
