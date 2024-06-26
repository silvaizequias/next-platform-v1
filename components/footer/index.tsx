import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full h-full bg-gradient-to-b from-slate-200 to-sky-200/60 py-12 flex justify-center items-center">
      <div className="w-full max-w-4xl p-2 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
        <div className="w-full flex flex-col justify-center sm:justify-start">
          <Link
            href={'/'}
            className="text-xl text-center md:text-left text-sky-800 font-semibold lowercase"
          >
            Dedicado
          </Link>
          <small className="text-xs text-center md:text-left font-thin lowercase">
            {'© '} 2023 - {new Date().getFullYear()} | 52.378.516/0001-78
          </small>
          <small className="text-xs text-center md:text-left font-thin lowercase">
            todos os direitos reservados
          </small>
        </div>
        <div className="w-full flex flex-col justify-center sm:justify-end gap-2"></div>
      </div>
    </footer>
  )
}
