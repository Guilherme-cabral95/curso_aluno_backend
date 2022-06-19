import dotenv from 'dotenv';

dotenv.config();
import path from 'path';
import './databases';
import express from 'express';
import UserRouter from './routes/User';
import AlunosRouters from './routes/Alunos';
import token from './routes/token';
import foto from './routes/Foto';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.relative(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/foto/', foto);
    this.app.use('/user/', UserRouter);
    this.app.use('/token/', token);
    this.app.use('/alunos/', AlunosRouters);
  }
}

export default new App().app;
