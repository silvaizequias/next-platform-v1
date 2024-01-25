'use client'

import { OrganizationProps } from '../types'

export default function MyOrganizationDetailView(props: OrganizationProps) {
  const { data: organization } = props

  return organization ? (
    <div className="w-full flex flex-col gap-2 p-2">
      <small className="text-xs font-thin opacity-60 flex gap-2">
        documento:
        <span className="opacity-100 font-medium italic">
          {organization?.document}
        </span>
      </small>
      <small className="text-xs font-thin opacity-60 flex gap-2">
        e-mail:
        <span className="opacity-100 font-medium italic">
          {organization?.email}
        </span>
      </small>
      <small className="text-xs font-thin opacity-60 flex gap-2">
        telefone:
        <span className="opacity-100 font-medium italic">
          {organization?.phone}
        </span>
      </small>
      <small className="text-xs font-thin opacity-60 flex gap-2">
        cep:
        <span className="opacity-100 font-medium italic">
          {organization?.zipCode}
        </span>
      </small>
      <small className="text-xs font-thin opacity-60 flex gap-2">
        logradouro:
        <span className="opacity-100 font-medium italic">
          {organization?.street}, {organization?.complement}
        </span>
      </small>
    </div>
  ) : null
}
