import { NavigationType, topNavigator } from '@/navigation'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed w-full min-h-12 backdrop-blur-md bg-slate/30 z-10 flex justify-center items-center">
      <div className="w-full max-w-4xl p-2 flex justify-between items-center">
        <Link
          href={'/'}
          className="text-sky-800 text-2xl hover:opacity-80 font-semibold"
        >
          dedicado
        </Link>
        <div className="flex flex-1 justify-end items-center">
          <ul className='w-full flex justify-end items-center gap-4'>
            {topNavigator.map((item: NavigationType, index) => {
              return (
                <li key={index} className='text-sm capitalize'>
                  <a href={item?.path || '#'}>{item.title}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
