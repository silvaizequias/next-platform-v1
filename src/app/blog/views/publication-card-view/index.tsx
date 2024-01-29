import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/pt-br'
import { PublicationType } from '../../types'
import { Suspense } from 'react'
import Loading from '@/app/loading'

interface Props {
  publication: PublicationType
}

export default function PublicationCardView(props: Props) {
  const { publication } = props

  const image = '/logotipo.svg'

  const createdAt = moment(publication?.createdAt).format('LL')

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative block">
        <div className="w-full min-w-fit flex justify-center flex-row bg-slate-100 dark:bg-slate-900 my-4 rounded-lg">
          <div className="m-0 w-1/5 shrink-0">
            <Image
              className="w-full h-full object-cover rounded-l-lg"
              src={publication?.image || image}
              alt={publication?.title}
              priority
              width={180}
              height={180}
            />
          </div>
          <div className="gap-2 w-4/5 flex flex-col justify-center p-4 mx-4">
            <small className="text-xs font-thin opacity-50">{createdAt}</small>
            <h4 className="text-xl sm:text-2xl font-semibold lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
              {publication?.title}
            </h4>
            <p className="text-base text-justify font-normal line-clamp-3 opacity-80">
              {publication?.resume}
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
