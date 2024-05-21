'use client'

import { useCallback, useEffect, useState } from 'react'
import { Slider } from '@nextui-org/slider'
import { useParams, useRouter } from 'next/navigation'
import { subscriptionRepositoryCheckout } from '@/repositories/subscriptions/POST'

interface Props {
  onClose: () => void
}

export default function AddCreditForOrganizationForm(props: Props) {
  const { onClose } = props
  const [credit, setCredit] = useState<number>(100)
  const [payment, setPayment] = useState<number>(120)

  useEffect(() => {
    const value = 1.2 * credit
    setPayment(value)
  }, [credit])

  const router = useRouter()
  const params = useParams()
  const { document } = params

  const handleSubmit = useCallback(async () => {
    await subscriptionRepositoryCheckout({
      document: `${document}`,
      credit: credit,
      url: process.env.NEXTAUTH_URL ?? '',
    }).then((data) => {
      console.log(data)
      const url = data.url
      router.push(url)
      onClose()
    })
  }, [credit, document, onClose, router])

  return (
    <div className="relative flex flex-col max-w-lg gap-2">
      <div className="h-60 w-full flex flex-col justify-center items-center">
        <div className="mx-auto p-2">
          <span className="text-8xl dark:text-slate-200">{credit}</span>
        </div>
        <span className="text-xl text-green-400">R$ {payment.toFixed(2)}</span>
        <Slider
          getValue={(value) => setCredit(Number(value))!}
          label="créditos"
          step={10}
          maxValue={10000}
          minValue={100}
          defaultValue={credit}
          className="w-full"
          color="success"
        />
      </div>
      <span className="text-center text-sm dark:text-slate-200">
        ao clicar no botão será direcionado para o ambiente de finalização de
        sua compra
      </span>
      <button
        className="w-full p-2 my-2 text-slate-50 font-semibold bg-green-400/75 rounded-md hover:opacity-80 hover:shadow-md"
        type="button"
        onClick={handleSubmit}
      >
        {`adicionar créditos`}
      </button>
    </div>
  )
}
