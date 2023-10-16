import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
} from '@material-tailwind/react'
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { MdWhatsapp } from 'react-icons/md'

export default function OpenWhatsApp() {
  const openWithText = 'Gostaria de obter suporte!'
  const url = `https://wa.me/554833729180?text=${openWithText}`
  //TODO: elaborar maneira como abrirá o link do whatsapp

  return (
    <div className='relative w-full'>
      <div className='absolute bottom-4 right-4'>
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton
              color='white'
              size='lg'
              className='rounded-full border border-blue-gray-50 shadow-xl'
            >
              <PlusIcon className='h-5 w-5 transition-transform group-hover:rotate-45' />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className='rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10'>
            <SpeedDialAction className='bg-blue-gray-50'>
              <MdWhatsapp className='h-5 w-5' />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  )
}
