import api from 'src/services/api'
import useSWR from 'swr'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await api.get(url)

    return response.data
  })

  return { data, error, mutate }
}
