module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foto_aluno', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_alunos: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      main_photo: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
