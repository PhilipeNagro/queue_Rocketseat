import Mail from '../lib/Mail';

export default {
  key: 'UserReport', //Nome da "job q vai ser executada"
  async handle({ data }) {
    const { user } = data;

     console.log(user);
  },
};