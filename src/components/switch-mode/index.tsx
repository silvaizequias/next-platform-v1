'use client'

import { useEffect, useState } from 'react'
import { SwitchOptions } from './options'

export default function SwitchMode() {
  const [stored, setStored]: any = useState()
  const [mode, setMode] = useState<'dark' | 'light' | undefined>(stored)

  useEffect(() => {
    const element = window.document.documentElement!
    const storage = window.localStorage!
    setStored(storage.getItem('mode'))
    setMode(stored)
    if (!storage.getItem('mode')) {
      element.classList.add('dark')!
      storage.setItem('mode', 'dark')!
      setStored('dark')!
    }
    if (!mode) {
      const loadStorage: any = storage.getItem('mode')!
      if (loadStorage) {
        element.classList.add(loadStorage!)
        setStored(loadStorage!)
        setMode(loadStorage!)
      }
    }
  }, [stored, mode])

  const handleMode = (option: any) => {
    const element = window.document.documentElement!
    const storage = window.localStorage!
    option === 'light'
      ? element.classList.remove('dark')!
      : element.classList.remove('light')!
    setMode(option)
    element.classList.add(option)!
    storage.setItem('mode', option)!
  }

  return SwitchOptions.map(
    (option) =>
      mode === option.mode && (
        <span
          key={option.mode}
          onClick={() => handleMode(option.switch)}
          className={`text-xl cursor-pointer rounded-full p-2 dark:hover:bg-lunar-900 hover:bg-lunar-50 hover:text-${option.color}-900`}
        >
          <option.icon />
        </span>
      ),
  )
}
