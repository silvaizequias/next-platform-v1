'use client'

import { useCallback, useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

export default function SwitchTheme() {
  const [stored, setStored] = useState<string | undefined>()
  const [theme, setTheme] = useState<string>(stored!)

  useEffect(() => {
    const element = window.document.documentElement.classList
    const item = window.localStorage.getItem('theme')
    const storage = window.localStorage

    item == null && (storage.setItem('theme', 'light'), element.add('light'))

    setStored(item!)
    setTheme(item!)

    item == 'dark' && (element.remove('light'), element.add(item))
    item == 'light' && (element.remove('dark'), element.add(item))
  }, [stored, theme])

  const handleMode = useCallback(
    (option: string) => {
      const element = window.document.documentElement.classList
      const storage = window.localStorage

      stored == undefined &&
        (storage.setItem('theme', option), element.add(option))

      option == 'light' &&
        (setTheme(option),
        storage.removeItem('theme'),
        storage.setItem('theme', option))

      option == 'dark' &&
        (setTheme(option),
        storage.removeItem('theme'),
        storage.setItem('theme', option))

      setTheme(option)
    },
    [stored],
  )

  return (
    <div className="relative">
      <span
        className="flex cursor-pointer rounded-full p-2 hover:opacity-50 hover:bg-opacity-25"
        onClick={() =>
          theme == 'dark' ? handleMode('light') : handleMode('dark')
        }
      >
        {theme == 'dark' ? <HiOutlineMoon /> : <HiOutlineSun />}
      </span>
    </div>
  )
}
