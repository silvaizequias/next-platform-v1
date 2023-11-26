export type SendTemplateType = {
  name?: string
  organization?: string
  password?: string
  role?: string
  solution?: string
}

export const welcomeMessageTemplate = async (data: SendTemplateType) => {
  return [
    {
      email: `<p>Bem vindo(a) <strong>${data?.name}</strong> a ${
        data?.organization || 'DEDICADO'
      }!</p>
    <p>Esta é sua senha <strong>${
      data?.password
    }</strong> para acessar a plataforma ${data?.solution}</p>
    <p>É um prazer ter você em nosso sistema!</p>`,
      sms: `Sua senha para acessa ${data?.solution} é ${data?.password}`,
    },
  ]
}
export const passwordResetTemplate = async (data: SendTemplateType) => {
  return [
    {
      email: `<p>Olá <strong>${data?.name}</strong>!</p>
    <p>Você está recebendo esta mensagem porque foi soliciata uma redefinição de senha para acesso a plataforma ${
      data?.solution
    } da <strong>${data?.organization || 'DEDICADO'}</strong></p>
    <p>Sua nova senha é <strong>${data?.password}</strong></p>
    <p>Para qualquer dúvida ou dificuldade, conte sempre com o nosso suporte!</p>`,
      sms: `Sua NOVA SENHA para acessa ${data?.solution} é ${data?.password}`,
    },
  ]
}

export const newOrganizationUserTemplate = async (data: SendTemplateType) => {
  return [
    {
      email: `<p>Olá <strong>${data?.name}</strong>!</p>
    <p>Você foi incluído na Organização <strong>${data?.organization}</strong> como <strong>${data?.role}</strong></p>
    <p>Ao acessa a plataforma ${data?.solution} você terá mais informações sobre essa organização.</p>
    <p>É um prazer ter você em nosso sistema!</p>`,
      sms: `Você foi incluído na Organização ${data?.organization} como ${data?.role}`,
    },
  ]
}
