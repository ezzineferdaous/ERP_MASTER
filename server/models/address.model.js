// Address.module.js
module.exports = (sequelize, DataTypes) => {

     const Address = sequelize.define("Address", {
      Code: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Code existe déja',
        },
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code Address'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code Address"
          }
        }
      },
      CardCode: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code Partenaire'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code Partenaire"
          }
        }
      },
      AddressType: {
        type: DataTypes.CHAR(1),
        allowNull:false,
        validate: {
          isIn: {
            args: [['B', 'S']], /* B = Billing  S = Shipping */
            msg: "Les valeur autorisée sont (B: Facturation, S: Livraison)"
          },
          notNull: {
            msg: 'Veuillez saisir le Type Address'
          }
        }
      },
      Street: {
        type: DataTypes.STRING(200)
      },
      Block: {
        type: DataTypes.STRING(200)
      },
      CountryCode: {
        type: DataTypes.STRING(3),
      },
      CityCode: {
        type: DataTypes.STRING(100),
      },
      ZIPCode: {
        type: DataTypes.STRING(20)
      }
    });
      
    return Address;
  };