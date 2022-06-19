import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import UserModel from '../models/User';
import FotosAlunos from '../models/FotosAlunos';

const models = [Aluno, UserModel, FotosAlunos];

const connection = new Sequelize.Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(((model) => model.associate && model.associate(connection.models)));
