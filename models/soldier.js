'use strict';
module.exports = (sequelize, DataTypes) => {
  const Soldier = sequelize.define('Soldier', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3,10],
          msg: `Name must between 3 and 10 characters`
        }
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 100,
          msg: `Minimum input attack is 100`
        },
        max: {
          args: 1000,
          msg: `Maximum input attack is 1000`
        }
      }
    },
    kingdomId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeValidate: (value) => {
        return new Promise((resolve, reject) => {
          Soldier.getSoldiers(value.kingdomId)
            .then((count) => {
              if (count > 20) {
                reject('Add soldier failed')
              } else {
                resolve()
              }
            })
  
            .catch((err) => {
              reject(err)
            })
        })
      }
    }
  });

  Soldier.getSoldiers = (id) => {
    return new Promise((resolve, reject) => {

      Soldier.count({
        where: {
          kingdomId: id
        }
      })
      .then((count) => {
        resolve(count)
      })
      
      .catch((err) => {
        reject (err)
      })
    })
  }

  Soldier.getAttacks = (id) => {
    return new Promise((resolve, reject) => {
      Soldier.sum('attack', {
        where: {
          kingdomId: id
        }
      })
        .then((attacks) => {
          resolve(attacks)
        })

        .catch((err) => {
          reject(err)
        })
    })
  }

  Soldier.associate = function(models) {
    // associations can be defined here
    Soldier.belongsTo(models.Kingdom,{foreignKey:"kingdomId"})
  };
  return Soldier;
};