import { Metadata } from 'next'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  title: 'Sistema Personalizado de Alta Performance',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  keywords: [
    'software de serviço em nuvem',
    'software saas',
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
  ],
  alternates: {
    canonical: NEXTAUTH_URL,
  },
  openGraph: {
    url: new URL(NEXTAUTH_URL),
    title: 'Sistema Personalizado de Alta Performance',
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function MainPage() {
  return (
    <div>
      <div>
        <div>
          <h1>Dedicado Digital</h1>
          <p>
            Sistemas personalizados de alta performance
          </p>
        </div>
      </div>
    </div>
  )
}
