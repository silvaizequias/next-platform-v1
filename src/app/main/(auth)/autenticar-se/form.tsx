export default function SignInForm() {
  return (
    <form className="flex flex-col w-full max-w-lg gap-4">
      <p className="py-4 text-center italic">
        informe suas credenciais para autenticar-se na plataforma
      </p>
      <input
        className="rounded shadow border-blue-400 focus:shadow-lg"
        type="number"
        name="phone"
        id="signInPhone"
        placeholder="48 98765 4321"
        required
      />
      <input
        className="rounded shadow border-blue-400 focus:shadow"
        type="password"
        name="password"
        id="signInPassword"
        placeholder="s*e*n*h*a"
        required
      />
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        autenticar-se
      </button>
    </form>
  )
}
