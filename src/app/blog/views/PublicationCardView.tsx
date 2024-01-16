import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from '@material-tailwind/react'
import { PublicationType } from '../types'

interface Props {
  publication: PublicationType
}

export default function PublicationCardView(props: Props) {
  const { publication } = props

  const image = '/logotipo.svg'

  return (
    <Tooltip content={`ler tudo sobre ${publication?.subject.toLowerCase()}`}>
      <div className="relative block">
        <Card className="w-full max-w-md flex justify-center flex-row bg-blue-gray-50">
          <CardHeader
            shadow={true}
            floated={true}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <Image
              className="w-full h-full object-cover"
              src={publication?.image || image}
              alt={publication?.title}
              priority
              width={180}
              height={180}
            />
          </CardHeader>
          <CardBody className="gap-2 w-3/5 flex flex-col justify-center">
            <Typography color="blue-gray" className="text-xs font-thin">
              {new Date(publication?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography className="text-xl font-semibold lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-light-blue-200">
              {publication?.title}
            </Typography>
            <Typography
              color="gray"
              className="text-base font-normal line-clamp-3"
            >
              {publication?.resume}
            </Typography>
          </CardBody>
        </Card>
      </div>
    </Tooltip>
  )
}
