import { Button, Input } from '@nextui-org/react'
export default function SignUpForm() {
  return (
    <form className="flex flex-col flex-1 gap-4 m-2">
      <Input size="sm" name="name" type="text" label="Nome Completo" required />
      <Input size="sm" name="email" type="email" label="E-mail" required />
      <Input size="sm" name="phone" type="text" label="Celular" required />
      <Button
        size="sm"
        variant="light"
        color="success"
        className="w-full uppercase"
      >
        Registrar-se
      </Button>
    </form>
  )
}
