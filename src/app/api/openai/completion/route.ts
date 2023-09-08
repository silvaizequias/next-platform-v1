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
        if (await OpenAiCompletionSchema.parseAsync(inputs)) {
          const { content, maxTokens, model } = inputs

          const completions = await openai.completions
            .create({
              max_tokens: maxTokens,
              model: model,
              prompt: content,
            })
            .then(async (res) => {
              const { text }: any = res.choices[0]
              return await text
            })
          return new Response(await completions)
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
