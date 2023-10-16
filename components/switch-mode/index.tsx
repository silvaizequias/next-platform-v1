import { useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

export default function SwitchMode() {
  const [onDark, setOnDark] = useState('dark')

//TODO: implementar lógica de mudança de tema

  const handleMode = () => {
    onDark == '' ? setOnDark('dark') : setOnDark('')
  }

  return onDark == 'dark' ? (
    <HiOutlineMoon color='white' size={18} onClick={handleMode} />
  ) : (
    <HiOutlineSun color='yellow' size={18} onClick={handleMode} />
  )
}
