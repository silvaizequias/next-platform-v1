'use client'

import { Switch } from '@mui/base'
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
      <Switch color="default"></Switch>
      {theme == 'dark' ? (
        <FaSun onClick={() => setTheme('light')} />
      ) : (
        <FaMoon onClick={() => setTheme('dark')} />
      )}
    </div>
  )
}
