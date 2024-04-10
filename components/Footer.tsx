import Link from 'next/link'
import { memo } from 'react'

function Footer() {
  return (
    <div className="max-w-7xl mx-auto w-full p-8 space-y-2">
      <div className="pt-10 flex flex-col justify-center items-center md:flex-row md:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href={'/'}
            className="text-xl text-center md:text-left text-sky-600 font-semibold lowercase"
          >
            dedicado
          </Link>
          <small className="text-xs text-center md:text-left font-thin lowercase">
            {'© '} 2023 - {new Date().getFullYear()} | 52.378.516/0001-78
          </small>
          <small className="text-xs text-center md:text-left font-thin lowercase">
            todos os direitos reservados
          </small>
        </div>
        <Link
          href={`${process.env.NEXTAUTH_URL}/termos-e-politicas`}
          target="_blank"
          className="py-2 text-xs text-center md:text-left font-thin lowercase hover:text-sky-600 cursor-pointer"
        >
          termos e políticas
        </Link>
      </div>
    </div>
  )
}

export default memo(Footer)
