import SwitchMode from '@/components/switch-mode'
import { IconButton } from '@material-tailwind/react'
import { HiLogin } from 'react-icons/hi'

export default function ToolBar() {
  return (
    <div className='flex items-center gap-2'>
      <IconButton variant='text'>
        <SwitchMode />
      </IconButton>
      <IconButton variant='text' color='white'>
        <HiLogin size={24} />
      </IconButton>
    </div>
  )
}
