import OpenAI from 'openai'
import { Configuration, OpenAIApi } from 'openai-edge'

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

export const openaiApi = new OpenAIApi(configuration)
