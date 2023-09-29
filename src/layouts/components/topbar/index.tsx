import { TopBarProps } from '@/layouts/types'
import { Fragment, useState } from 'react'
import DrawerSideBar from '../drawer-sidebar'
import { useRouter } from 'next/navigation'

export default function TopBar(props: TopBarProps) {
  const { onClose, session } = props
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const router = useRouter()

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
    onClose()
  }

  return (
    <Fragment>
      <h1>topbar</h1>
      <DrawerSideBar onClose={handleDrawer} open={openDrawer} />
    </Fragment>
  )
}
