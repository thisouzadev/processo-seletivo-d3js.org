module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
        [{
          name: 'Lewis Hamilton',
          birthday: '10/10/1991',
          email: 'lewis@gmail.com',
          password: '1234',
        },
        {
          name: 'Michael Schumacher',
          birthday: '10/12/1910',
          email: 'michael@gmail.com',
          password: '1234',
        },
        ], {timestamps: false});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
