import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div>
        <div>
          <div>
            <h4>Ops!</h4>
            <p>Esse conteudo nao existe ou foi movido daqui...</p>
            <Link href="/">Retornar ao inicio</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
