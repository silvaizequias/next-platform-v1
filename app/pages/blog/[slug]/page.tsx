import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const { slug } = params

  return {
    title: {
      default: slug,
      template: `%s | dedicado`,
    },
    description: 'Conteúdo inteligente do universo de tecnologia.',
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {slug}
    </div>
  )
}
