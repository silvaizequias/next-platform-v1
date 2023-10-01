import { SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'
import { signIn } from 'next-auth/react'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  return (
    <div><AuthSignInForm /></div>
  )
}
