'use client'

import useFetch from "@/hooks/useFetch"

export default function ServiceManagementView() {
  const SERVICE_MANAGEMENT_API_URL = process.env.NEXT_PUBLIC_SERVICE_MANAGEMENT_API_URL!
  const {data: orders} = useFetch(`${SERVICE_MANAGEMENT_API_URL}/orders`)

  return JSON.stringify(orders)
}
