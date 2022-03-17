import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs'; //importa todos os jobs e coloca dentro de um objeto jobs

const queues = Object.values(jobs).map(job=>({
    bull:new Queue(job.key ,redisConfig),
    name: job.key,
    handle:job.handle,
}))

// exporta objetos
console.log(queues);
export default{
    queues, //fila exportada
    
    add(name, data){  //nome da fila para inserir novo job, e os dados
        const queue = this.queues.find(queue=>queue.name== name);
        return(queue.bull.add(data));
    },
    process(){
        return this.queues.forEach(queue=>{
            queue.bull.process(queues.handle);

            
        // //Sempre que o job falhar, recebe os dados do job aqui
            queue.bull.on('failed',(job, err) =>{
            console.log('Job Failed', job.name, job.data);
            console.log(err);
            });

        })
    }
}


// import RegistrationMail from '../jobs/RegistrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);


// export default mailQueue;

