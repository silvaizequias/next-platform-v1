import { openaiApi } from '@/libraries/openai'
import { aiDefaultTemplate } from '@/libraries/openai/templates'
import { OpenAiSchema, OpenAiSchemaType } from '@/types/openai/schema'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const POST = async (request: Request) => {
  try {
    return await request.json().then(async (inputs: OpenAiSchemaType) => {
      if (await OpenAiSchema.parseAsync(inputs)) {
        const { content, model } = inputs

        const response = await openaiApi.createChatCompletion({
          model: model,
          messages: [{ role: 'user', content: content! }],
          stream: true,
        })

        const stream = OpenAIStream(response, {
          async onCompletion(completion) {
            const title = content.substring(0, 100)
            const id = new Date().getTime()
            const createdAt = Date.now()
            const payload = {
              id,
              title,
              createdAt,
              messages: [aiDefaultTemplate],
            }
          },
        })
        return new StreamingTextResponse(stream)
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
  }
}
