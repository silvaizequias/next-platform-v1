import Image from 'next/image'

export default function BlogScreen() {
  const logotipo = '/logotipo.svg'

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col max-w-lg w-full justify-center items-center">
        <Image
          className="my-4 w-[179px] h-[259px]"
          src={logotipo}
          alt={'Dedicado'}
          priority
          //loading={'lazy'}
          width={179}
          height={259}
        />
        <h1 className="text-6xl text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase">
          blog dedicado
        </h1>
        <div className="mx-8">
          <div className="p-2">
            <h6 className="text-lg text-center py-4">conteúdo inteligente</h6>
          </div>
        </div>
      </div>
    </div>
  )
}
