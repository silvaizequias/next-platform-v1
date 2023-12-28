interface Props {
  image?: string
  subject: string
  title: string
}

export default function BlogHeader(props: Props) {
  const { image, subject, title } = props

  return (
    <header className="z-auto overflow-hidden w-full">
      <div
        className="m-0 w-full bg-[url('/logotipo.svg')] bg-cover bg-center"
      >
        <div className="z-auto pt-16 h-80 mx-auto relative block backdrop-brightness-50 backdrop-blur-sm">
          <div className="min-h-full px-10 flex flex-col justify-center items-center">
            <div className="mx-auto text-center">
              <span className="font-bold text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-light-blue-200">
                {title}
              </span>
            </div>
            <div className="mx-auto my-6 px-8 sm:px-16 text-center">
              <span className="font-semibold text-sm sm:text-base uppercase text-blue-gray-50">
                {subject}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
