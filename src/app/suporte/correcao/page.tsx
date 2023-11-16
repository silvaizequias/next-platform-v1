import { Metadata } from 'next'
import CorrectionSupportView from './views'

export const metadata: Metadata = {
  title: 'Suporte para Correção de Falhas',
  description: 'A Dedicado oferece suporte especializado para clientes que necessitam de ações resolutivas para correção de falhas.',
}

export default async function CorrectionSupportPage() {
  return <CorrectionSupportView />
}