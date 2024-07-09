'use client'

import { Article } from '@prisma/client'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { actionFindAllArticles } from '../actions/articles.action'

interface Props {
  countArticles: number
  articles: Article[]
}
export const PlatformContext = createContext({} as Props)

export default function PlatformProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [countArticles, setCountArticles] = useState<number>(0)
  const [articles, setArticles] = useState<Article[]>([])

  const getArticles = useCallback(async () => {
    return await actionFindAllArticles().then((data) => {
      setCountArticles(data.response.count), setArticles(data.response.data)
    })
  }, [])

  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <PlatformContext.Provider value={{ countArticles, articles }}>
      {children}
    </PlatformContext.Provider>
  )
}
