import { MdHome, MdPhonelink } from 'react-icons/md'

interface NavigationProps {
  text: string
  href: string
  icon: any
}

export const SidebarLinks = [
  { text: 'Home', href: '/', icon: MdHome },
  {
    text: 'Gestão de Serviços',
    href: '/gestao-de-servicos',
    icon: MdPhonelink,
  },
]
