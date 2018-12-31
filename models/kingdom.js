'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kingdom = sequelize.define('Kingdom', {
    kingdomName: DataTypes.STRING,
    nameOfKing: DataTypes.STRING,
    districtId: DataTypes.INTEGER,
    population: DataTypes.INTEGER
  }, {
    hooks: {
      beforeUpdate: (value) => {
        let enemyId = null
        return new Promise((resolve, reject) => {
          Kingdom.getKingdom(value.districtId)
            .then((kingdom) => {
              if (!kingdom) {
                resolve()
              } else {
                enemyId = kingdom.id
                return Promise.all([
                  sequelize.models.Soldier.getAttacks(value.id),
                  sequelize.models.Soldier.getAttacks(kingdom.id)
                ])
              }
            })

            .then((attacks) => {
              if (attacks[0] > attacks[1]) {
                return Kingdom.update({
                  districtId: null
                }, {
                  where: {
                    id: enemyId
                  }
                })
              } else {
                reject(`Failed to get district`)
              }
            })

            .then(() => {
              resolve()
            })

            .catch((err) => {
              reject(err);
            })
        })
      }
    }
  });

  Kingdom.getKingdom = (districtId) => {
    return new Promise((resolve, reject) => {
      Kingdom.findOne({
        where: {
          districtId: districtId
        }
      })
        .then((kingdomId) => {
          resolve(kingdomId)
        })

        .catch((err) => {
          reject(err)
        })
    })
  }

  Kingdom.associate = function(models) {
    // associations can be defined here
    Kingdom.hasMany(models.Soldier,{foreignKey:"kingdomId"})
    Kingdom.belongsTo(models.District,{foreignKey:"districtId"})
  };
  return Kingdom;
};