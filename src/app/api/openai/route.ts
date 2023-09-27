import { openaiApi } from '@/libraries/openai'
import { aiDefaultTemplate } from '@/libraries/openai/templates'
import { OpenAiSchema, OpenAiSchemaType } from '@/types/openai/schema'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'

export const POST = async (request: Request): Promise<any> => {
  const inputs: OpenAiSchemaType = await request.json()
  try {
    if (await OpenAiSchema.parseAsync(inputs)) {
      const { content, model } = inputs

      const response = await openaiApi.createChatCompletion({
        model: model! || 'gpt-3.5-turbo',
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
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
