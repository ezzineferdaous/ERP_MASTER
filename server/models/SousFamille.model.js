
module.exports = (sequelize, DataTypes) => {
    const SousFamille = sequelize.define("SousFamille", {

      CodeSFamille: {
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
      NomSFamille: {
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
      CodeFamille: {
        type: DataTypes.STRING(100)
      }
      
    });
      
    return SousFamille;
  };