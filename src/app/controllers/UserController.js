//import Mail from '../lib/Mail';
import Queue from '../lib/Queue';
export default{
    async store(req, res){ //devolve metodo store
        const { name, email, password } = req.body;  //devolve nome, email, password "cadastro do usuario"
        
        const user = {  //criando o objeto user
            name,
            email,
            password,
        };

        //  await Mail.sendMail({
        //      from: 'Queue Test <queue@queuetest.com.br>',
        //      to: `${name}<${email}>`,
        //      subject:`Cadastro de usuario`,
        //      html:`Ola, ${name}, bem-vindo ao sistema de filas de email :D` 
        //  });
        
        // Adicionar job RegistrationMail na fila
        
        await Queue.add('RegistrationMail',{user});

        await Queue.add('UserReport', { user });  //Segundo job a ser disparado

        return res.json(user); 
    }
}