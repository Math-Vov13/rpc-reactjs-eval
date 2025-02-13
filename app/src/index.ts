import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { JSONRPCServer } from 'json-rpc-2.0';
import { config } from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { userService } from './services/userService';
import { taskService } from './services/taskService';

config();

const app = express();
const server = new JSONRPCServer();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// JSON-RPC
server.addMethod('user.create', userService.create);
server.addMethod('user.get', userService.get);
server.addMethod('user.update', userService.update);
server.addMethod('user.delete', userService.delete);

server.addMethod('task.create', taskService.create);
server.addMethod('task.get', taskService.get);
server.addMethod('task.update', taskService.update);
server.addMethod('task.delete', taskService.delete);





app.post('/api', async (req, res) => {
  const jsonRPCRequest = req.body;
  const result = await server.receive(jsonRPCRequest);
  
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(204);
  }
});

// Middleware Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});