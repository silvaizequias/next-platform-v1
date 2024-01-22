import { Metadata } from 'next'
import { Fragment, ReactNode } from 'react'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  applicationName: 'dedicado',
  generator: 'dedicado',
  category: 'blog',
  title: {
    default: 'blog',
    template: `%s | dedicado`,
  },
  description: 'Conteúdo inteligente de tecnologia',
  icons: './favicon.ico',
  keywords: [
    'conteudo inteligente',
    'blog de conteúdo de tecnologia',
    'conteúdo de inteligencia artificial',
    'blog ia',
    'blog inteligente',
  ],
  openGraph: {
    title: {
      default: 'blog',
      template: `%s | dedicado`,
    },
    description: 'Conteúdo inteligente de tecnologia',
    images: ['/logotipo.png'],
  },
  metadataBase: new URL(`https://blog.${NEXT_PUBLIC_URL}`),
  alternates: {
    canonical: new URL(`https://blog.${NEXT_PUBLIC_URL}`),
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <div className="flex justify-center w-full py-8">
        <div className="flex flex-col max-w-sm sm:max-w-4xl w-full border-t-sky-800 dark:border-t-sky-600 border-opacity-20 dark:border-opacity-20  border-t-[0.01rem] border-spacing-4">
          <h6 className="mt-4 text-center font-medium text-base">
            dedicado digital
          </h6>
          <span className="text-center lining-nums text-xs opacity-80">
            © 2023 - {new Date().getUTCFullYear()} | 52.378.516/0001-78
          </span>
          <small className="text-center text-xs opacity-60 font-extralight"></small>
          <span className="text-center text-xs opacity-60 font-extralight">
            alguns direitos de publicações reservados
          </span>
        </div>
      </div>
    </Fragment>
  )
}
