import { ChatCompletionRequestMessage } from 'openai-edge'

export const aiDefaultTemplate: ChatCompletionRequestMessage = {
  role: 'system',
  name: 'Dedicado Digital',
  content: 'Inteligência Artificial da Dedicado Digital',
}
