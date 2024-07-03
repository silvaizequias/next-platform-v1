import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params

  return {
    alternates: {
      canonical: document,
    },
    title: {
      default: document,
      template: `%s | dedicado`,
    },
    description:
      'A dedicado oferece soluções personalizadasque atendem necessidades específicas da operação, visando a alta disponibilidade com o menor custo de sustentação.',
  }
}

export default function OrganizationPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {document}
    </div>
  )
}
