import { SettingsContext, SettingsContextValue } from '@/layouts/settings'
import { useContext } from 'react'

export const useSettings = (): SettingsContextValue =>
  useContext(SettingsContext)
