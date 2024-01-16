import ResetPasswordForm from './form'

export default function ResetPasswordScreen() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col max-w-lg w-full">
        <h1 className="text-6xl text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase">
          dedicado
        </h1>
        <div className="mx-8">
          <div className="p-2">
            <h6 className="text-lg text-center py-4">
              sua melhor plataforma de serviços
            </h6>
          </div>
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 mx-8 rounded shadow-xl">
          <div className="p-2"></div>
          <div className="p-2">
            <div className="flex flex-col items-center">
              <ResetPasswordForm />
            </div>
          </div>
          <div className="p-2 text-xs text-right"></div>
        </div>
      </div>
    </div>
  )
}
