import { authOptions } from '@/libraries/next-auth'
import { apiai } from '@/libraries/openai'
import {
  OpenAiChatCompletionSchema,
  OpenAiChatCompletionSchemaType,
} from '@/schemas/openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getServerSession } from 'next-auth'

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id!
  const userName = session?.user?.name!

  try {
    return await request
      .json()
      .then(async (inputs: OpenAiChatCompletionSchemaType) => {
        if (await OpenAiChatCompletionSchema.parseAsync(inputs)) {
          const { content, model } = inputs

          const response = await apiai.createChatCompletion({
            model: model,
            messages: [{ role: 'user', name: userName ,content: content! }],
            stream: true,
          })

          const stream = OpenAIStream(response, {
            async onCompletion(completion) {
              const title = content.substring(0, 100)
              const id = new Date().getTime()
              const createdAt = Date.now()
              const path = `/api/openai/chat-completion/${id}`
              const payload = {
                id,
                title,
                userId,
                createdAt,
                path,
                messages: [{ role: 'assistant', content: completion! }],
              }
            },
          })
          return new StreamingTextResponse(stream)
        }
      })
  } catch (error: any) {
    console.error(error)
    return new Response(error?.message || error, { status: 400 })
  }
}
