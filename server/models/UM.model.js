
module.exports = (sequelize, DataTypes) => {
    const UM = sequelize.define("UM", {

      CodeUM: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code UM'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code UM"
          }
        }
      },
      NomUM: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Nom UM'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom UM"
          }
        }
      } 
      
    });
      
    return UM;
  };