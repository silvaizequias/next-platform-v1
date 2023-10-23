import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="m-8">
          <div className="flex flex-col text-center">
            <h4 className="uppercase text-6xl font-light">Ops!</h4>
            <p className="uppercase text-sm text-horizon-800">
              Esse conteudo nao existe ou foi movido daqui...
            </p>
            <Link className="uppercase text-xs text-horizon-600" href="/">
              Retornar ao inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
