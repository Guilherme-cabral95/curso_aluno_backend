import dotenv from 'dotenv';

dotenv.config();
import path from 'path';
import './databases';
import express from 'express';
import Cors from 'cors';
import helmet from 'helmet';
import UserRouter from './routes/User';
import AlunosRouters from './routes/Alunos';
import token from './routes/token';
import foto from './routes/Foto';

const whiteList = [
  'http://15.228.154.191',
  'http://localhost:8083',
];

const corsOption = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by Cors'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(Cors(corsOption));
    this.app.use(helmet());
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
