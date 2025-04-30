
module.exports = (sequelize, DataTypes) => {
    const Partner = sequelize.define("Partner", {

      CardCode: {
        type: DataTypes.STRING(15),
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
      CardName: {
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
      CardType: {
        type: DataTypes.CHAR(1),
        validate: {
          isIn: {
            args: [['C', 'S']], /* C = Client S = Fournisseur */
            msg: "Les valeur autorisée sont (C, S)"
          }
        }
      },
      GroupCode: {
        type: DataTypes.STRING(15)
      },
      Phone: {
        type: DataTypes.STRING(20)
      },
      Fax: {
        type: DataTypes.STRING(20)
      }, 
      MailAddres : {
        type: DataTypes.STRING(100)
      }, 
      ICE : {
        type: DataTypes.STRING(100),
      }, 
      FreeText : {
        type: DataTypes.TEXT
      }, 
      Territory : {
        type: DataTypes.INTEGER
      }, 
      ListNum : {
        type: DataTypes.INTEGER
      }, 
      CreditLine : {
        type: DataTypes.DECIMAL(10, 2)
      }, 
      DebtLine : {
        type: DataTypes.DECIMAL(10, 2)
      }, 
      Currency : {
        type: DataTypes.STRING(4)
      }, 
      Balance : {
        type: DataTypes.DECIMAL(10,2)
      }, 
      Active : {
        type: DataTypes.CHAR(1),
        validate: {
          isIn: {
            args: [['Y', 'N']], /* S = Sociéte P = Privé A = Salarié G = Gouvernement */
            msg: "Les valeur autorisée sont (Y, N)"
          }
        },
        defaultValue: "Y"
      }, 
      IF : {
        type: DataTypes.STRING(200)
      }, 
      RC : {
        type: DataTypes.STRING(200)
      },
      ModePaiement : {
        type: DataTypes.INTEGER
      }, 
      VatStatus : {
        type: DataTypes.STRING(200)
      }, 
      ECVatCode : {
        type: DataTypes.STRING(200)
      }, 
      AttachmentId : {
        type: DataTypes.INTEGER
      }
    });
      
    return Partner;
  };