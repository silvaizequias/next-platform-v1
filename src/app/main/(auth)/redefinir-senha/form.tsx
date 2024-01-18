export default function ResetPasswordForm() {
  return (
    <form className="flex flex-col w-full max-w-lg gap-4">
      <p className="py-4 text-center italic">
        um código de segurança será enviado para o número de telefone registrado
        na plataforma
      </p>
      <input
        className="rounded shadow border-orange-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="resetPasswordPhone"
        placeholder="48 98765 4321"
        required
      />
      <button
        className="bg-orange-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        redefinir a senha
      </button>
    </form>
  )
}
