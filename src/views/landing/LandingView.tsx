'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import AuthTabsView from '../auth/AuthTabsView'

export default function LandingView() {
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  return (
    <div>
      <AuthTabsView />
    </div>
  )
}
