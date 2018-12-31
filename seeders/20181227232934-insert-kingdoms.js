'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Kingdoms', [
    {
      kingdomName: "Endless",
      nameOfKing: 'A'
    },
    {
      kingdomName: "Spartan",
      nameOfKing: 'B'
    },
    {
      kingdomName: "Rendezvous",
      nameOfKing: 'C'
    },
    {
      kingdomName: "Battle Leader",
      nameOfKing: 'D'
    },
    {
      kingdomName: "Kapak Merah",
      nameOfKing: 'E'
    },
   ], {});
},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Kingdoms', null, {});
  }
};
