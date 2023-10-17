import { IconType } from 'react-icons'
import {
  HiOutlineChatAlt2,
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineHome,
} from 'react-icons/hi'

type NavigationTypes = {
  title: string
  path: string
  icon: IconType
}

export const UserNavigation: NavigationTypes[] = [
  { title: 'Início', path: '/', icon: HiOutlineHome },
  { title: 'Soluções Personalizadas', path: '/solucoes', icon: HiOutlineChip },
  {
    title: 'Gestão de Serviços',
    path: '/solucoes/gestao-de-servicos',
    icon: HiOutlineCube,
  },
  { title: 'Suporte Especializado', path: '/suporte', icon: HiOutlineChatAlt2 },
]
