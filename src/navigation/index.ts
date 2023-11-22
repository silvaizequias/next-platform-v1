import { IconBaseProps } from 'react-icons'

export type NavigationType = {
  icon?: IconBaseProps
  name: string
  path?: string
}

export const defaultNavigation: NavigationType[] = [
  {
    name: 'Início',
    path: '/',
  },
  {
    name: 'Suporte',
    path: '/suporte',
  },
]

