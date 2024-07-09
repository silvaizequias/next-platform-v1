'use client'

import { actionFindBySlugArticle } from '@/app/core/actions/articles.action'
import { Article } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

export default function ArticleDetail({ slug }: Readonly<{ slug: string }>) {
  const [article, setArticle] = useState<Article>()

  const getArticle = useCallback(async () => {
    return await actionFindBySlugArticle(slug).then((data) => {
      setArticle(data.response?.data)
    })
  }, [slug])

  useEffect(() => {
    getArticle()
  }, [getArticle])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {article?.title}
    </div>
  )
}
