'use client'

import { createContext, ReactNode, useState } from 'react'

interface Props {}
const ControlContext = createContext<Props>({})
export default ControlContext

export function ControlProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [] = useState()
  return (
    <ControlContext.Provider value={{}}>{children}</ControlContext.Provider>
  )
}
