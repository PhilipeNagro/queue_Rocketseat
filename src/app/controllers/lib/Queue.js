import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';


//Criando um array de JOBS
const queues = Object.values(jobs).map(job => ({
  //retornando um objeto 
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
    
    return queue.bull.add(data, queue.options);
  },
  process() {  ///Metodo que vai processar as filas
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      //Para saber qual erro 
      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    })
  }
};