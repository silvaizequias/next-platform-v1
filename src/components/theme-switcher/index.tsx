'use client'

import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="default"
        thumbIcon={({ isSelected, className }) =>
          theme == 'dark' ? (
            <FaSun className={className} onClick={() => setTheme('light')} />
          ) : (
            <FaMoon className={className} onClick={() => setTheme('dark')} />
          )
        }
      ></Switch>
    </div>
  )
}
