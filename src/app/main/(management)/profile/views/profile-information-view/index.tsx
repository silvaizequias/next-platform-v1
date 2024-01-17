export default function ProfileInformationView() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center gap-1">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          informações básicas
        </h6>
        <div className="flex flex-shrink">
          <button className="text-xs bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200">
            atualizar informações
          </button>
        </div>
      </div>
      <div className="py-4"></div>
    </div>
  )
}
