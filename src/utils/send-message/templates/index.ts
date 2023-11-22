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
