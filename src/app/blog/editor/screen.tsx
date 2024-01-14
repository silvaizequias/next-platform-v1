'use client'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { PostType } from '../types'
import { NewspaperIcon, PlusIcon } from '@heroicons/react/24/solid'

interface Props {
  posts: PostType[]
}

export default function EditorScreen(props: Props) {
  const { posts } = props

  const logotipo = '/logotipo.svg'

  const TABLE_HEAD = ['publicação', 'autor', 'status', '']
  const TABLE_ROWS: PostType[] = Object.create(posts)

  return (
    <div className="p-6 mx-2 sm:mx-4">
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mx-auto flex items-center justify-between gap-8">
            <div className="lowercase">
              <Typography variant="h5" color="blue-gray">
                publicações do blog
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="light-green"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> criar
                publicação
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((post: PostType, index) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={post?.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={post?.image || logotipo}
                          alt={post?.title}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {post?.title}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {post?.channel}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {post?.author}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={post?.draft ? 'rascunho' : 'publicado'}
                          color={post?.draft ? 'blue-gray' : 'green'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Tooltip content="detalhes">
                          <IconButton variant="text">
                            <NewspaperIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}
