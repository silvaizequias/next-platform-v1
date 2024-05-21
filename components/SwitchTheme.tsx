'use client'

import { useCallback, useState, useTransition } from 'react'
import { Switch } from '@headlessui/react'
import { MdOutlineBrightness4, MdOutlineBrightness5 } from 'react-icons/md'

export default function SwitchTheme() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const handleAvailable = useCallback(() => {
    startTransition(() => setDarkTheme(!darkTheme))
  }, [darkTheme])

  return (
    <div className="relative">
      <Switch checked={darkTheme} onChange={handleAvailable}>
        <span
          className={`flex justify-center items-center p-2 rounded-full cursor-pointer hover:shadow-md`}
        >
          {!darkTheme ? (
            <MdOutlineBrightness5
              size={25}
              className="rounded-full text-sky-600/60"
            />
          ) : (
            <MdOutlineBrightness4 size={24} className="rounded-full" />
          )}
        </span>
      </Switch>
    </div>
  )
}
