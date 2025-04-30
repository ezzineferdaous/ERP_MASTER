
module.exports = (sequelize, DataTypes) => {
    const Famille = sequelize.define("Famille", {

      CodeFamille: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code '
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code"
          }
        }
      },
      NomFamille: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Nom '
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom"
          }
        }
      }, 
      CodeGroupe: {
        type: DataTypes.STRING(20)
      }

    });
      
    return Famille;
  };