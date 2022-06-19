const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      nome: 'John Doe',
      email: 'email@email.com',
      password_hash: await bcryptjs.hash('12345678', 8),
      created_at: new Date(),
      updated_at: new Date(),

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
