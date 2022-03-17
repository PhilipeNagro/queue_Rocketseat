import 'dotenv/config'; //vai ler todas as variaveis do arquivo env, q nao vao pra produção
import express from 'express';
import UserController from './app/controllers/UserController';
// import { BullBoardQueues } from 'bull-board/dist/@types/app';
import BullBoard from 'bull-board'; //importando BullBoard
import Queue from './app/lib/Queue';


const app = express();
// BullBoard.setQueues(Queue.queues.map(queue => queue.bull));
// BullBoard.setQueues(Queue.queues.map(queues => queues.bull));


// Para mostra q a requisição esta indo em formato de json
app.use(express.json());

//criando rota para cadastro de usuario
app.post('/users', UserController.store);


// app.use('/admin/queues', BullBoard.UI);

// ouvindo porta 3333
app.listen(4444, () => {
    console.log('Server running on localhost:4444'); //msg pra saber q esta funcionando
});
