import Link from 'next/link'
import { memo } from 'react'

function Footer() {
  const NODE_ENV = process.env.NODE_ENV
  const BASE_URL = process.env.BASE_URL ?? ''

  const URL =
    NODE_ENV == 'development'
      ? `${'http://' + BASE_URL}`
      : `${'https://' + BASE_URL}`

  return (
    <div className="max-w-6xl mx-auto w-full p-8 space-y-2">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href={'/'}
            className="text-xl text-center md:text-left text-sky-600 font-semibold"
          >
            dedicado
          </Link>
          <small className="text-xs text-center md:text-left font-thin">
            {'© '} 2023 - {new Date().getFullYear()} | 52.378.516/0001-78
          </small>
          <small className="text-xs text-center md:text-left font-thin">
            Todos os direitos reservados
          </small>
        </div>
        <Link
          href={`${URL}/termos-e-politicas`}
          target="_blank"
          className="text-xs text-center md:text-left font-thin hover:text-sky-600 cursor-pointer"
        >
          Termos e Políticas
        </Link>
      </div>
    </div>
  )
}

export default memo(Footer)
