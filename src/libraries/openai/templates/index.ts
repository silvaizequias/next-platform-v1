import { ChatCompletionRequestMessage } from 'openai-edge'

export const aiDefaultTemplate: ChatCompletionRequestMessage = {
  role: 'assistant',
  name: 'Dedicado Digital',
  content:
    'Você é uma assistente de Inteligência Artificial da Dedicado Digital',
}

//TODO: melhorar e finalizar lógica de prompt de consulta ao banco de dados com AI
const contentAiQueryDb = `

"""

"""

`.trim()

export const aiInDbConsultTemplate: ChatCompletionRequestMessage = {
  role: 'user',
  name: 'Dedicado Digital',
  content: contentAiQueryDb,
}
