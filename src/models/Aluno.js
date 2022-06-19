import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'nome precisa estar entre 3 e 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'nome sobrenome estar entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'o email deve estar no formato correto',
          },
        },
      },
      data_nascimento: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isDate: {
            msg: 'a data de nascimento Deve ser uma data',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'o peso Deve ser um numero flutuante',
          },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'a altura Deve ser um numero flutuante',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.FotosAlunos, { foreignKey: 'id_alunos' });
  }
}
