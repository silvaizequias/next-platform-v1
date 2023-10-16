import { UserNavigation } from '@/navigation'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from '@material-tailwind/react'
import { usePathname, useRouter } from 'next/navigation'
import { HiMenu } from 'react-icons/hi'

export default function TopMenu() {
  const router = useRouter()
  const pathname = usePathname()

  const handleRouter = (path: string) => {
    router.push(path)
  }
  return (
    <Menu
      placement='bottom-start'
      animate={{
        mount: { y: 10 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <IconButton variant='text' color='blue'>
          <HiMenu size={24} />
        </IconButton>
      </MenuHandler>
      <MenuList>
        {UserNavigation.map((item) => (
          <MenuItem
            key={item.title}
            className={`flex items-center gap-2 ${
              item.path === pathname && 'text-blue-400'
            }`}
            onClick={() => handleRouter(item.path)}
          >
            <item.icon size={18} />
            <Typography variant='small' className='font-normal uppercase'>
              {item.title}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
