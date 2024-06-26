import { Fragment, ReactNode } from 'react'
import Nav from '../nav'
import Footer from '../footer'

export default function DefaultDisplay({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <Nav />
      <main className="w-full min-h-full mx-auto flex flex-col justify-center items-center gap-4">
        {children}
      </main>
      <Footer />
    </Fragment>
  )
}
