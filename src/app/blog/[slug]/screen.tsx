'use client'

import { PublicationType } from '@/app/main/(management)/publications/types'

interface Props {
  publication: PublicationType
}

export default function PublicationScreen(props: Props) {
  const { publication } = props
  const image = publication?.image || '/logotipo.svg'

  let style = {
    backgroundImage: 'url(' + image + ')',
  }

  const content = { __html: publication?.content }
  const createdAt = new Date(publication?.createdAt).toLocaleDateString()
  const author = '@' + publication?.author.split('@')[1]

  return publication ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="z-auto overflow-hidden w-full">
        <div style={style} className="m-0 w-full bg-cover bg-center">
          <div className="z-auto pt-16 h-80 mx-auto relative block backdrop-brightness-50 backdrop-blur-sm">
            <div className="min-h-full px-10 flex flex-col justify-center items-center">
              <div className="mx-auto text-center">
                <h4 className="font-bold text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
                  {publication?.title}
                </h4>
              </div>
              <div className="mx-auto my-6 px-8 sm:px-16 text-center">
                <h6 className="font-semibold text-sm sm:text-base text-slate-200 uppercase">
                  {publication?.subject}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <div className="w-full flex justify-center">
          <div className="p-8 sm:px-20 max-w-4xl text-center">
            <small className="italic text-xs">{publication?.resume}</small>
          </div>
        </div>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="flex flex-col justify-center item-center gap-4">
            <div className="w-full">
              <article
                className="prose-md prose prose-stone m-auto dark:prose-invert sm:prose-lg text-justify"
                dangerouslySetInnerHTML={content}
              />
            </div>
          </div>
        </div>
        <div className="pt-8 sm:px-20 max-w-4xl text-center text-xs lowercase opacity-50">
          esta publicação foi criada em{' '}
          <span className="font-semibold">{createdAt}</span> por{' '}
          <span className="font-semibold">{author}</span>{' '}
          {publication?.generatedByAi && (
            <span>usando inteligência artificial</span>
          )}
        </div>
      </div>
    </div>
  ) : null
}
