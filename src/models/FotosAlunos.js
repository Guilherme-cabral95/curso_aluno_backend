import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class FotosAlunos extends Model {
  static init(sequelize) {
    super.init({
      id_alunos: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'O id_aluno  não pode ficar vazio',
          },
        },
      },
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome original não pode ficar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome do arquivo não pode ficar vazio',
          },
        },
      },

      main_photo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },

    }, {
      sequelize,
      tableName: 'foto_aluno',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'id_alunos' });
    // this.hasOne();
  }
}
