import { Button, Input } from '@nextui-org/react'
export default function SignInForm() {
  return (
    <form className="flex flex-col flex-1 gap-4">
      <Input
        variant="underlined"
        size="sm"
        name="email"
        type="email"
        label="E-mail"
        errorMessage={``}
      />
      <Input
        variant="underlined"
        size="sm"
        name="password"
        type="password"
        label="Senha"
        errorMessage={``}
      />
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
