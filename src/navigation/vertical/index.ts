// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/portal',
      icon: 'mdi:home-outline',
    }
  ]
}

export default navigation
