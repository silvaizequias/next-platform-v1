import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bottom-0 w-full bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto py-6">
        <div className="flex justify-between mx-2 sm:mx-8 text-xs">
          <div className="flex items-center gap-4">
            <Link href={'/'} className="uppercase hover:opacity-50">
              dedicado digital
            </Link>
            <span className="tabular-numstext-inherit font-thin">
              52.378.516/0001-78
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <Link href={'/termos-de-servico'} className="font-thin uppercase hover:opacity-50">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
