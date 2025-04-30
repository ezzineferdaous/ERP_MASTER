
module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define("Warehouse", {

      CodeWarehouse: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Code Magasin'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Code Magasin"
          }
        }
      },
      NomWarehouse: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Veuillez saisir le Nom Magasin'
          }, notEmpty: {
            args: true,
            msg: "Veuillez saisir le Nom Magasin"
          }
        }
      },
      Rue: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      NumRue: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CountryCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      City: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ActiveInactive: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CmptCharges: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CmptProduit: {
        type: DataTypes.STRING(100),
        allowNull: true,
      }
    });
      
    return Warehouse;
  };