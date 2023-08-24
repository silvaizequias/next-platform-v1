import OpenAI from 'openai'

export const openai = async () => {
  const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string

  const api = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })

  return api
}
