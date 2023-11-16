import { Metadata } from 'next'
import MigrationSupportView from './views'

export const metadata: Metadata = {
  title: 'Suporte para Migração de Conteúdo',
  description: 'A Dedicado oferece suporte especializado para clientes que necessitam migrar os dados de sua aplicação para outra estrutura.',
}

export default async function MigrationSupportPage() {
  return <MigrationSupportView />
}