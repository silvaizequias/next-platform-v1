'use client'

import { Button } from '@material-tailwind/react'

export default function ProfileInformationForm() {
  return (
    <form className="flex flex-col w-full max-w-lg gap-2 px-4">
      <p className="py-4 text-center italic"></p>
      <Button color="light-blue" type="submit">
        atualizar informações
      </Button>
    </form>
  )
}
