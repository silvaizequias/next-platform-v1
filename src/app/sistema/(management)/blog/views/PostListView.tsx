'use client'

import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { MdEditSquare } from 'react-icons/md'

export default function PostListView() {
  const { data: posts } = useFetch<PostType[] | undefined>('/api/posts')

  const router = useRouter()

  const handleClick = useCallback(
    (path: string) => {
      path && router.push(path)
    },
    [router],
  )

  const TABLE_HEAD = [
    'criada em',
    'titulo',
    'privado',
    'rascunho',
    'destaque',
    '',
  ]

  return (
    <div className="relative">
      <table className="w-full table-auto text-left lowercase">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: any) => (
              <th
                key={head}
                className="p-4 border-b border-blue-gray-100 bg-blue-gray-200"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: PostType) => {
            const classes = 'p-4 border-b border-blue-gray-200'

            return (
              <tr key={post?.id}>
                <td className={classes}>
                  {new Date(post?.createdAt).toLocaleString()}
                </td>
                <td className={classes}>{post?.title}</td>
                <td className={classes}>{post?.private ? 'SIM' : 'Não'}</td>
                <td className={classes}>{post?.draft ? 'SIM' : 'Não'}</td>
                <td className={classes}>{post?.spotlight ? 'SIM' : 'Não'}</td>
                <td className={classes}>
                  <div
                    className="text-green-400 opacity-50 hover:opacity-100 cursor-pointer"
                    onClick={() => handleClick(`/blog/editor/${post?.slug}`)}
                  >
                    <MdEditSquare />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
