export type SendTemplateType = {
  name?: string
  organization?: string
  password?: string
  solution?: string
}

const NEXTAUTH_URL = process.env.NEXTAUTH_URL

export const welcomeMessageTemplate = async (data: SendTemplateType) => {
  return `<p>Bem vindo(a) <strong>${data?.name}</strong> a ${
    data?.organization || 'DEDICADO'
  }!</p>
  <p>Esta é sua senha <strong>${
    data?.password
  }</strong> para acessar a plataforma ${data?.solution || NEXTAUTH_URL}</p>
  <p>É um prazer ter você em nosso sistema!</p>`
}

export const passwordResetTemplate = async (data: SendTemplateType) => {
  return `<p>Olá <strong>${data?.name}</strong>!</p>
  <p>Você está recebendo esta mensagem porque foi soliciata uma redefinição de senha para acesso a plataforma ${data?.solution || NEXTAUTH_URL} da <strong>${
    data?.organization || 'DEDICADO'
  }</strong></p>
  <p>Sua nova senha é <strong>${data?.password}</strong></p>
  <p>Para qualquer dúvida ou dificuldade, conte sempre com o nosso suporte!</p>`
}
