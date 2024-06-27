export type NavigationType = {
  title: string
  path?: string
}

export const topNavigator: NavigationType[] = [
  { title: 'Início', path: '/' },
  { title: 'Contato', path: '/contato' },
]

export const footerNavigator: NavigationType[] = [
  { title: 'Início', path: '/' },
  { title: 'Contato', path: '/contato' },
  { title: 'Termos e Políticas', path: '/termos-e-politicas' },
]