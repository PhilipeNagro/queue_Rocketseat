import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail', //Nome da "job q vai ser executada, pra indentificar possiveis erros"
  async handle({ data }) {
    const { user } = data;

    //Dados do email a ser mandado 
    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas da Rocketseat rsrs`
    });
  },
};