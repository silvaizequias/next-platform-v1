import { openai } from '@/libraries/openai'
import { OpenAiStreamSchema, OpenAiStreamSchemaType } from '@/schemas/openai'

export const POST = async (request: Request) => {
  try {
    return await request.json().then(async (inputs: OpenAiStreamSchemaType) => {
      if (await OpenAiStreamSchema.parseAsync(inputs)) {
        const { content, stream } = inputs

        //TODO: Sistema de conversas ainda precisa ser melhorado
        const data: any = (await openai()).chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: content }],
          stream: stream,
        })

        for await (const part of [data]) {
          console.log(
            process.stdout.write(part.choices[0]?.delta?.content || ''),
          )
          return new Response(
            JSON.stringify(
              process.stdout.write(part.choices[0]?.delta?.content || ''),
            ),
          )
        }
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
