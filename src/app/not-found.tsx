import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center uppercase">
          <h2 className="font-medium text-6xl">Ops!</h2>
          <p className="font-light text-base">
            O conteúdo não foi encontrado...
          </p>
          <Link className='font-thin text-xs hover:opacity-50' href="/">Retorne ao Início</Link>
        </div>
      </div>
    </div>
  )
}
