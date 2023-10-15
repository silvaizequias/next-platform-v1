import Link from 'next/link'
import { MdWhatsapp } from 'react-icons/md'

export default function OpenWhatsApp() {
  const openWithText = 'Gostaria de obter suporte!'

  return (
    <div className='absolute bottom-8 right-8'>
      <Link
        href={`https://wa.me/554833729180?text=${openWithText}`}
        target={'_blank'}
        className='text-green-400 hover:text-green-200'
      >
        <MdWhatsapp className='cursor-pointer' size={38} />
      </Link>
    </div>
  )
}
