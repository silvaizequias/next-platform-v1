'use client'

import { useCallback, useState } from 'react'

export default function OrderSearch() {
  const [code, setCode] = useState<string>('')

  const handleCode = (e: any) => {
    const input: string = e?.target?.value
    input.length > 7 && setCode(input)
  }

  return (
    <div className="relative flex justify-center space-x-2 w-full max-w-sm">
      <input
        className="w-2/3 rounded-md shadow-md"
        type="text"
        maxLength={16}
        placeholder="código do pedido"
        onChange={handleCode}
      />
      <button
        className={`w-1/3 py-2 text-slate-50 font-semibold  rounded-md ${
          !code
            ? 'opacity-10 bg-slate-400/75'
            : 'bg-sky-400/75 hover:opacity-80 hover:shadow-md'
        }`}
        type="button"
        disabled={!code}
      >
        pesquisar
      </button>
    </div>
  )
}
