// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/',
      icon: 'mdi:view-dashboard-outline',
    },
  ]
}

export default navigation
