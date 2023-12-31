import { IconType } from 'react-icons'
import { MdContactPage, MdDashboard } from 'react-icons/md'

export type NavigationType = {
  icon?: IconType | undefined
  name: string
  path?: string | undefined
}

export const userNavigation: NavigationType[] = [
  {
    icon: MdDashboard,
    name: 'início',
    path: '/',
  },
  {
    icon: MdContactPage,
    name: 'perfil',
    path: '/perfil',
  },
]
