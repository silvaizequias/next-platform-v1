import { SendTemplateType } from '@/types/send-message'

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

export const organizationUserTemplate = async (data: SendTemplateType) => {
  return [
    {
      email: `<p>Olá <strong>${data?.name}</strong>!</p>
      <p>Agora você faz parte da organização <strong>${data?.organization}</strong></p>`,
      sms: `${data?.name}, você foi incluído na organização ${data?.organization}`,
    },
  ]
}
