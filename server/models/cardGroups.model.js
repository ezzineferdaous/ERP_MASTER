
module.exports = (sequelize, DataTypes) => {
    const CardGroups = sequelize.define("CardGroups", {

      GroupCode: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code de groupe'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code de groupe"
          }
        }
      },
      GroupName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        notEmpty: true,   
        unique: true,        
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Nom de groupe'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom de groupe"
          }
        }
      },
      GroupType: {
        type: DataTypes.CHAR(1),
        allowNull:false,
        validate: {
          isIn: {
            args: [['C', 'S', 'L']], /* C = Client  S = Fournisseur L = Prospect*/
            msg: "Les valeur autorisée sont (C, S, L)"
          },
          notNull: {
            msg: 'Veuillez saisir le Type de groupe'
          }
        }
      },
      PriceList: {
        type: DataTypes.INTEGER
      },
      Discount: {
        type: DataTypes.DECIMAL(15,5)
      }

    });
      
    return CardGroups;
  };