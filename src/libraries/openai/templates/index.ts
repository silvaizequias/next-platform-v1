import { ChatCompletionRequestMessage } from 'openai-edge'

export const aiDefaultTemplate: ChatCompletionRequestMessage = {
  role: 'system',
  name: 'Sistema Dedicado',
  content: '',
}
