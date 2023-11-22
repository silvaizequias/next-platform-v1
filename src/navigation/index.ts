import { IconBaseProps, IconType } from 'react-icons'

export type NavigationType = {
  icon?: IconType
  name: string
  path?: string
}

export const defaultNavigation: NavigationType[] = [
  {
    name: 'Início',
    path: '/',
  },
  {
    name: 'Serviços',
    path: '/servicos',
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
  {
    name: 'Serviços',
    path: '/servicos',
  },
]

export const masterNavigation: NavigationType[] = [
  {
    name: 'Organizações',
    path: '/organizacoes',
  },
  {
    name: 'Serviços',
    path: '/servicos',
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
