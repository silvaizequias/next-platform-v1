'use client'

import { createContext, ReactNode, useState } from 'react'

interface Props {}
export const ControlContext = createContext({} as Props)

export default function ControlProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [] = useState()
  return (
    <ControlContext.Provider value={{}}>{children}</ControlContext.Provider>
  )
}
