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

export const sessionNavigation: NavigationType[] = [
  {
    name: 'Início',
    path: '/',
  },
]

export const masterNavigation: NavigationType[] = [
  {
    name: 'Organizações',
    path: '/organizacoes',
  },
  {
    name: 'Usuarios',
    path: '/usuarios',
  },
]

export const userNavigation: NavigationType[] = [
  {
    name: 'Perfil',
    path: '/perfil',
  },
]
