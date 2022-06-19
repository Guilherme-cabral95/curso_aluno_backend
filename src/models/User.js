import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O Campo Nome Número de Caracteres deve ter entre 3 e 255',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Deve ser um email',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',

      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O Número de Caracteres deve ter entre 6 e 50',
          },
        },
      },

    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    return this;
  }

  passwordCompare(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
