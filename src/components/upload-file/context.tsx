import { ReactNode, createContext, useState } from 'react'

export const UploadFileContext = createContext<any>({})

interface Props {
  children: ReactNode
  file: any
  url?: string
}

export const UploadFileProvider = (props: Props) => {
  const { children, file, url } = props

  return (
    <UploadFileContext.Provider value={file ? {url}  : ''}>
      {children}
    </UploadFileContext.Provider>
  )
}

export const UploadFileCustomer = UploadFileContext.Consumer
