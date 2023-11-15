import { Button, Input } from '@nextui-org/react'
export default function ForgotPasswordForm() {
  return (
    <form className="flex flex-col flex-1 gap-4 m-2">
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
        name="phone"
        type="text"
        label="Celular"
        errorMessage={``}
      />
      <Button
        size="sm"
        variant="flat"
        color="warning"
        className="w-full uppercase"
      >
        Redefinir a Senha
      </Button>
    </form>
  )
}
