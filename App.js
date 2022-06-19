import dotenv from 'dotenv';

dotenv.config();
import path from 'path';
import './src/databases';
import express from 'express';
import UserRouter from './src/routes/User';
import AlunosRouters from './src/routes/Alunos';
import token from './src/routes/token';
import foto from './src/routes/Foto';

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
