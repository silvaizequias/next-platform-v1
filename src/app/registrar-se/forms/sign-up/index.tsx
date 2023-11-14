import { Button, Input } from '@nextui-org/react'
export default function SignUpForm() {
  return (
    <form className="flex flex-col flex-1 gap-4 m-2">
      <Input
        variant="underlined"
        size="sm"
        name="name"
        type="text"
        label="Nome Completo"
        errorMessage={``}
      />
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
        variant="light"
        color="success"
        className="w-full uppercase"
      >
        Registrar-se
      </Button>
    </form>
  )
}
