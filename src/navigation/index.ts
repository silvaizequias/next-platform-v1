import { IconBaseProps } from 'react-icons'
import { HiHome } from 'react-icons/hi2'

export type NavigationType = {
  icon?: IconBaseProps
  name: string
  path?: string
}

export const topnav: NavigationType[] = [
  {
    name: 'Início',
    path: '/',
  },
]

export const sidenav: NavigationType[] = [
  { icon: HiHome, name: 'Início', path: '/' },
]
