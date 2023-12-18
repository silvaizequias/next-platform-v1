import Link from 'next/link'
import { ReactNode } from 'react'
import { MdApps } from 'react-icons/md'

export default function BlogLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return (
    <div className="block">
      <div className="fixed w-full">
        <div className="flex justify-end m-2">
          <Link
            className="text-4xl hover:opacity-50 text-sky-400 rounded-full p-1 bg-transparent"
            href={
              !isDevelopment
                ? `portal.${NEXTAUTH_URL}`
                : 'http://portal.localhost:3000'
            }
          >
            <MdApps />
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
