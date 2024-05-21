export default function CompleteProfileInformationView() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-2 my-8">
      <div className="max-w-md w-full bg-sky-200/50 p-4 rounded-md shadow-md">
        <div className="flex flex-col justify-center items-center gap-2 my-2">
          <small className="text-center text-xs text-white">
            percebemos que algumas informações do seu perfil aqui na plataforma
            ainda estão incompletas.
          </small>
          <small className="text-center text-base text-sky-800">
            para seguir com a criação de uma nova organização, por gentileza
            atualize as informações do seu perfil
          </small>
        </div>
      </div>
      <a
        href="/perfil"
        className="bg-sky-400 hover:bg-sky-400/60 py-1 my-2 max-w-md w-full rounded-md shadow-md text-white text-center "
      >
        atualizar agora
      </a>
    </div>
  )
}
