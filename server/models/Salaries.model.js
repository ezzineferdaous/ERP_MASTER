const { max } = require("lodash"); 
module.exports = (sequelize, DataTypes) => {
    const Salaries = sequelize.define("Salaries", {

      Code: {
        type: DataTypes.INTEGER,
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
      Prenom: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      Nom: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      Post: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Service: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Active: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      Agence: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Image: { 
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      Statut: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      TelP: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      TelPo: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Adresse: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Sexe: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      DateN: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      PayeN: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      Nationalite: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      SituationF: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      Nenfants: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      GovID: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      SalaireBase: {
        type: DataTypes.DECIMAL(19, 6),
        allowNull: true,
      },
      Remarque: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      PJ: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Zone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MDP: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      Profil: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ID_Rubrique: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      ID_Contrat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }

    });
      
    return Salaries;
  };