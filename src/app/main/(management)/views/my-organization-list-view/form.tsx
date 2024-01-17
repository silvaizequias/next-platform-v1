'use client'

export default function CreateMyOrganizationForm() {
  return (
    <form className="flex flex-col w-full max-w-lg gap-2 px-4">
      <p className="py-4 text-center italic"></p>
      <button
        className="bg-blue-400 opacity-bg-80 hover:opacity-100 my-2 py-2 rounded shadow hover:shadow-lg hover:text-slate-200"
        type="submit"
      >
        criar minha organização
      </button>
    </form>
  )
}
