const { max } = require("lodash"); 

module.exports = (sequelize, DataTypes) => {
    const Articles = sequelize.define("Articles", {

      ItemCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code Article'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code Article"
          }
        }
      },
      ItemName: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Nom Article'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom Article"
          }
        }
      },
      NomEtrange: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      CodeBarre: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      Vendu: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Active: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Achete: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Magasin: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      CodeFamille: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Stock: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Picture: { /* PictureName */
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      ItemGroupe: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Sfamille: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CodeUMV: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CodeUMA: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CodeUMS: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ArticleGerePar: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Remarque: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      PJ: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      EnStock: {
        type: DataTypes.DECIMAL(20,0),
        allowNull: true,
      },
      CmptCharges: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      CmptProduit: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      CmptStock: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      CmptVariation: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      GroupeTax: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      Messages: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    });
      
    return Articles;
  };