'use client'

import { useCallback, useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

export default function SwitchTheme() {
  const [darkTheme, setDarkTheme] = useState<boolean>()
  const [theme, setTheme] = useState<string>('')

  const handleMode = useCallback(() => {
    const element = window.document.documentElement

 
  }, [])

  return (
    <div className="relative">
      <span
        className="flex cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25"
        onClick={handleMode}
      >
        {darkTheme ? <HiOutlineMoon /> : <HiOutlineSun />}
      </span>
    </div>
  )
}
