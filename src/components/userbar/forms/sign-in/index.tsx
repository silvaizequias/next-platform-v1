import { Button, Input } from '@nextui-org/react'
export default function SignInForm() {
  return (
    <form className="flex flex-col flex-1 gap-4">
      <Input size="sm" name="email" type="email" label="E-mail" required />
      <Input size="sm" name="password" type="password" label="Senha" required />
      <Button
        size="sm"
        variant="shadow"
        color="primary"
        className="w-full uppercase"
      >
        Autenticar-se
      </Button>
    </form>
  )
}
