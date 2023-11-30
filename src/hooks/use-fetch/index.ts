import useSWR from 'swr'

export default function useFetch<Data = any, Error = any>(
  url: string,
  authorization?: string,
) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async (url: string) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${authorization}` },
      })
      return response.json()
    },
  )

  return { data, error, mutate }
}
