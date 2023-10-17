import { useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

export default function SwitchMode() {
  const [onDark, setOnDark] = useState('dark')

  //TODO: implementar lógica de mudança de tema

  const handleMode = () => {
    onDark == '' ? setOnDark('dark') : setOnDark('')
  }

  return onDark == 'dark' ? (
    <HiOutlineMoon className='text-gray-600' size={18} onClick={handleMode} />
  ) : (
    <HiOutlineSun className='text-yellow-600' size={18} onClick={handleMode} />
  )
}
