'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(25),
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING(25),
        allowNull:false
      },
      gender: {
        type: Sequelize.CHAR,
        allowNull:false
      },
      studentId: {
        type: Sequelize.STRING(10),
        allowNull:false,
        unique:true
      },
      collageCareer: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING(255)
      },
      phoneNumber: {
        type: Sequelize.STRING(15)
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};