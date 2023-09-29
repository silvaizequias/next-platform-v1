import { SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div><AuthSignInForm /></div>
  )
}
