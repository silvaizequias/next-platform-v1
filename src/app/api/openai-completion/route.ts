import { openai } from '@/libraries/openai'
import {
  OpenAiCompletionSchema,
  OpenAiCompletionSchemaType,
} from '@/schemas/openai'

export const POST = async (request: Request) => {
  try {
    return await request
      .json()
      .then(async (inputs: OpenAiCompletionSchemaType) => {
        if (OpenAiCompletionSchema.validateSync(inputs)) {
          const { content, maxTokens } = inputs

          const data = (await openai()).completions
            .create({
              model: 'text-davinci-003',
              prompt: content,
              max_tokens: maxTokens,
            })
            .then(async (res) => {
              const { text }: any = res.choices[0]
              return await text
            })
          return new Response(await data)
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
