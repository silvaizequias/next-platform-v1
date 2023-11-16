import { Metadata } from 'next'
import MigrationSupportView from './views'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Suporte para Migração de Conteúdo',
  description:
    'A Dedicado oferece suporte especializado para clientes que necessitam migrar os dados de sua aplicação para outra estrutura.',
  keywords: [
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
    'suporte para migração de conteúdo',
    'suporte para migração de contas',
    'suporte para migração de sites',
    'suporte para migração de banco de dados',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/suporte/migracao`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/suporte/migracao`),
    title: 'Suporte para Migração de Conteúdo',
    description:
      'A Dedicado oferece suporte especializado para clientes que necessitam migrar os dados de sua aplicação para outra estrutura.',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function MigrationSupportPage() {
  return <MigrationSupportView />
}
