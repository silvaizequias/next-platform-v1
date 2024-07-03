import { Fragment, ReactNode } from 'react'
import Nav from '../nav'

export default function DefaultDisplay({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <Nav />
      <main className="w-full min-h-full py-4 mx-auto flex flex-col justify-center items-center">
        {children}
      </main>
    </Fragment>
  )
}
