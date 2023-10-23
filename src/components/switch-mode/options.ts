import { IconType } from 'react-icons'
import { FiMoon, FiSun } from 'react-icons/fi'
type SwitchOptionsType = {
  mode: 'light' | 'dark'
  switch: 'light' | 'dark'
  icon: IconType
  color: 'solar' | 'lunar'
}

export const SwitchOptions: SwitchOptionsType[] = [
  { mode: 'light', switch: 'dark', icon: FiSun, color: 'solar' },
  { mode: 'dark', switch: 'light', icon: FiMoon, color: 'lunar' },
]
